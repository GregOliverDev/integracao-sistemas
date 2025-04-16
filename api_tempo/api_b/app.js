const express = require('express');
const app = express();
app.use(express.json());

const cities = [
    { "city": "Curitiba", "temp": 31, "unit": "Celsius" },
    { "city": "Tokyo", "temp": 22, "unit": "Celsius" },
    { "city": "London", "temp": 14, "unit": "Celsius" },
    { "city": "Paris", "temp": 17, "unit": "Celsius" },
    { "city": "Bangkok", "temp": 30, "unit": "Celsius" },
    { "city": "Dubai", "temp": 33, "unit": "Celsius" },
    { "city": "Istanbul", "temp": 20, "unit": "Celsius" },
    { "city": "Los Angeles", "temp": 24, "unit": "Celsius" },
    { "city": "Mexico City", "temp": 21, "unit": "Celsius" }
];

app.get("/weather", (req, res) => {
    const cityName = req.query.city;
    if (!cityName) {
        return res.json(cities);
    }

    const city = cities.find(v => v.city.toLowerCase() === cityName.toLowerCase());
    
    if (!city) {
        return res.status(404).json({ message: 'City not found' });
    }
    res.json(city);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});