const express = require('express');
const AuthApiController = require('../Controller/AuthController');
const { Auth } = require('../Middleware/auth');

const router = express.Router();


router.post('/create/user',AuthApiController.register);
router.post('/verify-otp',AuthApiController.verifyOtp)
router.post('/login/user',AuthApiController.login);
router.get('/user/dashboard',Auth,AuthApiController.dashboard);
router.post('/update/password',Auth,AuthApiController.updatePassword);


//crude
router.post('/user/create/product',Auth,AuthApiController.createProduct);
router.get('/get/product',Auth,AuthApiController.getProduct);
router.get('/get/product/:id',Auth,AuthApiController.getProductById);
router.put('/update/product/:id',Auth,AuthApiController.updateProducttest);
router.delete('/delete/product/:id',Auth,AuthApiController.deleteProduct);





module.exports = router;