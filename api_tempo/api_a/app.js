const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.get("/recommendation/:city", async (req, res) => {
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

        res.json({
            city: cityName,
            temperature: temp,
            unit: "Celsius",
            recommendation: recommendation
        });

    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: 'Cidade não encontrada' });
        } else {
            res.status(500).json({ message: 'Falha ao buscar dados meteorológicos' });
        }
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});