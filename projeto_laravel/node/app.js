const express = require('express');

const app = express();

const PORT = 3000;



app.use(express.json());



// Rota GET /products (apenas carros não elétricos)

app.get('/products', (req, res) => {

  const products = [

    {

      id: 1,

      name: "Ford Mustang GT",

      price: 55000,

      company: "Ford",

      description: "Muscle car clássico com motor V8 5.0L e tração traseira."

    },

    {

      id: 2,

      name: "Toyota Hilux",

      price: 48000,

      company: "Toyota",

      description: "Picape robusta com motor diesel 2.8L, ideal para off-road."

    },

    {

      id: 3,

      name: "BMW M3 Competition",

      price: 95000,

      company: "BMW",

      description: "Sedan esportivo com motor 3.0L twin-turbo e 503 cavalos."

    },

    {

      id: 4,

      name: "Chevrolet Camaro SS",

      price: 62000,

      company: "Chevrolet",

      description: "Esportivo americano com motor V8 6.2L e câmbio manual."

    }

  ];



  res.json(products);

});



app.listen(PORT, () => {

  console.log(`Servidor rodando em http://localhost:${PORT}`);

});