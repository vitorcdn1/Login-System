require('dotenv').config()

const express = require('express')
const Router = require('./Router/Router')
const path = require('path')
const app = express()

app.use('/', Router)
app.use(express.json())

if (process.env.NODE_ENV != "development") {
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get('/', (req, res) => { res.sendFile('index.html') })
}


app.listen(5000, (req, res) => {
    console.log('Server running 5000')
})