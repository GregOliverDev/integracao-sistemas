const redis = require('redis');

const client = redis.createClient({
    host: 'redis',
    port: 6379
});

client.on('error', (err) => {
    console.error('Redis error: ', err);
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

function generateSensorData() {
    return {
        temperatura: (20 + Math.random() * 10).toFixed(2),
        pressao: (1000 + Math.random() * 50).toFixed(2),
        timestamp: new Date().toISOString()
    };
}

module.exports = {
    generateSensorData
};