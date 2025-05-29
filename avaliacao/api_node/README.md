# Oil Well Sensor API

This project simulates sensors installed in oil wells and provides an API to retrieve simulated temperature and pressure data.

## Project Structure

```
oil-well-sensor-api
├── src
│   ├── app.js                # Entry point of the application
│   ├── routes
│   │   └── sensorData.js     # Route handler for sensor data
│   ├── services
│   │   └── sensorService.js   # Service for generating sensor data
│   └── cache
│       └── redisClient.js     # Redis client for caching
├── package.json               # NPM configuration file
└── README.md                  # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd oil-well-sensor-api
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the Redis server if it's not already running.

4. Start the application:
   ```
   node src/app.js
   ```
   or
   ```
   npm run start
   ```

## API Usage

### GET /sensor-data

This endpoint returns simulated temperature and pressure data from the oil well sensors.

#### Response

- **200 OK**
  - Content-Type: application/json
  - Body:
    ```json
    {
      "temperature": <random_temperature>,
      "pressure": <random_pressure>
    }
    ```

## Dependencies

- Express: Web framework for Node.js
- Redis: In-memory data structure store for caching

## License

This project is licensed under the MIT License.