const express = require('express');
const AuthApiController = require('../Controller/AuthController');
const { Auth } = require('../Middleware/auth');

const router = express.Router();


router.post('/create/user',AuthApiController.register);
router.post('/verify-otp',AuthApiController.verifyOtp)
router.post('/login/user',AuthApiController.login);
router.get('/dashboard',Auth,AuthApiController.dashboard);




module.exports = router;