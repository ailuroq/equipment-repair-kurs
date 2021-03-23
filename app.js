const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').createServer(app)
require('dotenv').config()

app.use('/api', require('./src/routes'))

app.use(require('cors')({
    'origin': true,
    'methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'allowedHeaders': ['Content-Type', 'x-access-token', 'user-agent'],
    'optionsSuccessStatus': 200
}));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

PORT = process.env.PORT
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})

module.exports = app