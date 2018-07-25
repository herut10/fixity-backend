'use strict'
const express = require('express')
var cors = require('cors')
const addUserRoutes = require('./routes/userRoutes')

var bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('dist'))
addUserRoutes(app)


app.get('/', (req, res) => res.send('Hello World!'))



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))