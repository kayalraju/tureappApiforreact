const express = require('express')
const jwt = require('jsonwebtoken')
const verify = require('../Middleware/verify')
const route = express.Router()
const controller = require('../Controller/userController')
const userAuth = require('../Middleware/userAuth')

route.get('/', controller.userAuth ,controller.home)
route.get('/login', controller.login)
route.post('/registrationPost', [verify.verifyUser], controller.newUser)
route.post('/loginPost', controller.loginPost)
route.get('/dashbord', [userAuth.jwtAuth], controller.userAuth, controller.dashbord)
route.get('/logout', controller.logout)




module.exports = route
