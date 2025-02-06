const express=require('express');
const ApiRoute=express.Router();
const ApiControlller=require('../Controller/apiController')
const UserRegisterLoginController=require('../Controller/UserRegisterController')
const bodyParser = require('body-parser')
const Auth=require('../Middleware/AuthHelper')

//use body parser for get data from form body
ApiRoute.use(bodyParser.json());
ApiRoute.use(bodyParser.urlencoded({ extended: true }));


//****user login register */
ApiRoute.post('/register',UserRegisterLoginController.register)
ApiRoute.post('/login',UserRegisterLoginController.login)
ApiRoute.post('/update-password',Auth.veryfyToken,UserRegisterLoginController.update_password)
ApiRoute.post('/forget-password',UserRegisterLoginController.forgetPassword)
ApiRoute.get('/dashboard',Auth.veryfyToken,UserRegisterLoginController.dashboard)
ApiRoute.get('/profile',UserRegisterLoginController.user,UserRegisterLoginController.profile)

//banner
ApiRoute.get('/banner',ApiControlller.banner);
ApiRoute.get("/banner/photo/:cid", ApiControlller.Bannerphoto);

//about
ApiRoute.get('/about',ApiControlller.about);

//top destination
ApiRoute.get('/destination',ApiControlller.destination);
ApiRoute.get('/destination/:slug',ApiControlller.destination_details);

//Tour Packages
ApiRoute.get('/packages',ApiControlller.packages);
//Tour guide
ApiRoute.get('/guide',ApiControlller.guide);
//Tour testimoniols
ApiRoute.get('/testimonial',ApiControlller.testimonial);

module.exports=ApiRoute;