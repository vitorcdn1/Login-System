const express = require('express')
const Router = express.Router()
const login = require('../Controller/Controller')

Router.post('/Register', express.json(), login.Register)
Router.post('/Login', express.json(), login.Login)

module.exports = Router