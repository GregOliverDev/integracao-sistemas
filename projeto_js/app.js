const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0110G",
  database: "users"
});

connection.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

app.get("/", (req, res) => {
  const message = "Hello Pica";
  res.send(message);
});

app.get("/testJson", (req, res) => {
  res.json({
    name: "Gregory",
    lastName: "Oliveira",
    age: 21,
    job: "Fudido",
    preferences: ["Travel", "Music", "Movies"],
  });
});

app.get("/learningQuery", (req, res) => {
  const response = {
    name: req.query.name,
  };
  res.json(response);
});

app.get("/users", (req, res) => {
    const query = `SELECT * FROM users WHERE name = '${req.query.name}'`
    connection.query(query,function(err,result, field){res.json(result)})
})

app.listen(port, () => console.log(`app is up ${port}`));