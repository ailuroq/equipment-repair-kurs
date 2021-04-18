const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
const path = require("path");
require('dotenv').config()


app.use(cors())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', require('./src/routes'))
app.use(express.static(path.join(__dirname, '/uploads')))

PORT = process.env.PORT
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})

module.exports = app