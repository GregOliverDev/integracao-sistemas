const express = require('express');
const app = express();

const sensorDataRouter = require('./routes/sensorData');
app.use('/', sensorDataRouter);
const alertRouter = require('./routes/alert');
app.use('/', alertRouter);

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});