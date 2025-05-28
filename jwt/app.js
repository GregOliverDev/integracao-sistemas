const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const jwtSec = "dasdasdasdasdasdas"

const users = [
    { id: 1, email: 'email1@email.com', pass: 'senha1', cpf: "xxx" },
    { id: 2, email: 'email2@email.com', pass: 'senha2', cpf: "xxx" },
    { id: 3, email: 'email3@email.com', pass: 'senha3', cpf: "kxx" }
]

app.post('/login', (req, res) => {
    const { email, pass } = req.body

    const user = users.find(e => e.email == email && e.pass == pass)

    if (!user) {
        res.status(404).json({ msg: "não encontrado" })
    }

    const jwtObj = {
        id: user.id,
        email: user.email,
        pass: user.pass,
    }
    const token = jwt.sign(jwtObj, jwtSec);

    res.json(token)
})

app.get('/cpf', (req, res) => {
    let token = req.headers.authorization

    if (!token) {
        res.status(401).json({ msg: "Token not found" })
    }

    token = token.split(" ")[1]

    jwt.verify(token, jwtSec, (error, user) => {
        if (err) res.status(403).json({message: "Token not valid"})
    })

    let response = users.find(e => e.id == req.query.id)

    res.json(response)
})

app.listen(3000, () => console.log('Serve up'))