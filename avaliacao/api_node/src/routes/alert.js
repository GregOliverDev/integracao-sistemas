const express = require('express');
const axios = require('axios');
const router = express.Router();
const sensorService = require('../services/sensorService');

const eventos = [
    'Temperatura Alta',
    'Pressão Baixa',
    'Sensor Offline',
    'Falha de Comunicação',
    'Operação Normal'
];

router.post('/alert', async (req, res) => {
    try {
        const sensorData = sensorService.generateSensorData();
        const evento = eventos[Math.floor(Math.random() * eventos.length)];
        const alerta = {
            ...sensorData,
            evento
        };
        const response = await axios.post('http://api_python:5000/event', alerta);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Erro ao enviar alerta para API Python:', error.message);
        res.status(500).json({ error: 'Erro ao enviar alerta para API Python' });
    }
});

module.exports = router;