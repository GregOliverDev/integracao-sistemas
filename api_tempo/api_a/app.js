const express = require('express');
const axios = require('axios');
const redis = require('redis');
const app = express();
app.use(express.json());

const redisClient = redis.createClient({
  url: 'redis://localhost:6000'
});

redisClient.connect().catch(console.error);

const checkCache = async (req, res, next) => {
  const { city } = req.params;
  
  try {
    const cachedData = await redisClient.get(city);
    if (cachedData) {
      console.log('Dados recuperados do cache');
      return res.json(JSON.parse(cachedData));
    }
    next();
  } catch (err) {
    console.error('Erro no Redis:', err);
    next();
  }
};

app.get("/recommendation/:city", checkCache, async (req, res) => {
    const cityName = req.params.city;

    try {
        const response = await axios.get(`http://localhost:3000/weather?city=${cityName}`);
        const weatherData = response.data;

        if (response.status === 404) {
            return res.status(404).json({ message: 'Cidade não encontrada' });
        }

        let temp;
        if (Array.isArray(weatherData)) {
            const city = weatherData.find(c => c.city.toLowerCase() === cityName.toLowerCase());
            if (!city) {
                return res.status(404).json({ message: 'Cidade não encontrada' });
            }
            temp = city.temp;
        } else {
            temp = weatherData.temp;
        }

        let recommendation;
        if (temp > 30) {
            recommendation = "Está calor! Mantenha-se hidratado e use protetor solar.";
        } else if (temp >= 15 && temp <= 30) {
            recommendation = "O clima está agradável. Aproveite o seu dia!";
        } else {
            recommendation = "Está frio lá fora. Vista um casaco!";
        }

        const result = {
            city: cityName,
            temperature: temp,
            unit: "Celsius",
            recommendation: recommendation,
        };

        await redisClient.setEx(cityName, 60, JSON.stringify(result));
        console.log('Dados armazenados no cache');

        res.json(result);

    } catch (error) {
        console.error("Erro ao buscar dados meteorológicos:", error.message);
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: 'Cidade não encontrada' });
        } else {
            res.status(500).json({ message: 'Falha ao buscar dados meteorológicos' });
        }
    }
});

process.on('SIGINT', () => {
  redisClient.quit();
  process.exit();
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});