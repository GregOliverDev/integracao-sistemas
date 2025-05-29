const express = require('express');
const router = express.Router();
const sensorService = require('../services/sensorService');
const redisClient = require('../cache/redisClient');

router.get('/sensor-data', async (req, res) => {
    const cacheKey = 'sensorData';

    redisClient.get(cacheKey, async (err, cachedData) => {
        if (err) {
            console.log('Erro ao acessar o Redis:', err);
            return res.status(500).json({ error: 'Error accessing cache' });
        }

        if (cachedData) {
            console.log('Cache HIT: dados retornados do Redis');
            return res.json(JSON.parse(cachedData));
        }

        console.log('Cache MISS: gerando novos dados de sensor');
        const sensorData = sensorService.generateSensorData();

        redisClient.setex(cacheKey, 30, JSON.stringify(sensorData));

        return res.json(sensorData);
    });
});

module.exports = router;