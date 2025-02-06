const express=require('express');
const ApiRoute=express.Router();
const TestController=require('../Controller/TestController')
const bodyParser = require('body-parser')
const uploadTest=require('../Middleware/TestImage')
const uploadOptions=require('../Middleware/ProductImage')
//const Auth=require('../../middleware/auth')

//use body parser for get data from form body
ApiRoute.use(bodyParser.json());
ApiRoute.use(bodyParser.urlencoded({ extended: true }));
ApiRoute.use(express.urlencoded({ extended: true }))

//test Ui
ApiRoute.get('/user',TestController.adminAuth,TestController.testView);
ApiRoute.post('/student',uploadTest.single('image'),TestController.adminAuth,TestController.create);
ApiRoute.get('/student/delete/:id',TestController.adminAuth,TestController.deleteData);


//*****Api */
const TestImages=require('../Middleware/TestImage')
ApiRoute.post('/user',TestImages.single('photo'),TestController.createUser);
ApiRoute.get('/alluser',TestController.allUser);

//******Product Api */

//ApiRoute.post('/product',uploadOptions.single('image'),TestController.productCreate)
//**for multiple image */
ApiRoute.post('/product',uploadOptions.array('image', 10),TestController.productCreate)
ApiRoute.get('/allproduct',TestController.allproduct);
//ApiRoute.get('/product/details/:id',TestController.productdetails);
ApiRoute.get('/product/details/:slug',TestController.productdetails);



//*****Student api */
ApiRoute.post('/student/create',TestController.StudentCreate);
ApiRoute.get('/student/show',TestController.Studentshow);
ApiRoute.get('/student/:slug',TestController.Studentsingle);



module.exports=ApiRoute;