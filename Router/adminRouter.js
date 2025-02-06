
const express = require('express');
const route = express.Router()
const controller = require('../Controller/adminController')
const AboutController=require('../Controller/AboutController')
const TopDestinationController=require('../Controller/TopDestinationController');
const TorePackageController=require('../Controller/TurePackageController');
const TureGuideController=require('../Controller/TureGuideControlller')
const TestimonialsController=require('../Controller/TestimonialsController')
const DestinationDetailsController=require('../Controller/DestinationDetailsController')
const formidable=require('express-formidable');
const body_parser = require('body-parser')

route.use(express.urlencoded({ extended: true }))
route.use(body_parser.json());
route.use(body_parser.urlencoded({ extended: true }));

route.get('/login', controller.adminLogin)
route.get('/', controller.adminAuth, controller.adminDeshbord)
route.get('/adminLogout', controller.logout)
route.post('/adminLogin', controller.loginPost)
//Banner controller
route.get('/banner',controller.adminAuth,controller.banner)
route.post('/banner/create',formidable(),controller.adminAuth,controller.banner_create)
route.get('/banner/image/:bid',controller.adminAuth,controller.bannerphoto);
route.get('/banner/delete/:id',controller.adminAuth,controller.bannerDelete);

//About route
const upload=require('../Middleware/AboutUploadImage')
route.get('/about',AboutController.adminAuth,AboutController.about);
//route.post('/about/create',formidable(),AboutController.adminAuth,AboutController.about_create);
route.post('/about/create',upload.array('photo'),AboutController.adminAuth,AboutController.about_create);
//route.get('/about/image/:id',AboutController.adminAuth,AboutController.aboutphoto);
route.get('/about/delete/:id',AboutController.adminAuth,AboutController.deleteData);

//Top destination
const uploadDestinationImage=require('../Middleware/DestinationUploadImage')
route.get('/destination',TopDestinationController.adminAuth,TopDestinationController.topdestination);
route.post('/destination/create',uploadDestinationImage.single('photo'),TopDestinationController.adminAuth,TopDestinationController.destination_create);
route.get('/destination/delete/:id',TopDestinationController.adminAuth,TopDestinationController.deleteData);
route.get('/destination/edit/:id',TopDestinationController.adminAuth,TopDestinationController.editData);

//Destination details 
route.get('/destination/details',DestinationDetailsController.adminAuth,DestinationDetailsController.destinationDetails)

//ture packages
const uploadTureImage=require('../Middleware/TureUploadImage')
route.get('/ture-package',TorePackageController.adminAuth,TorePackageController.package);
route.post('/ture-package/create',uploadTureImage.array("photo"),TorePackageController.adminAuth,TorePackageController.package_create);
route.get('/ture-package/delete/:id',TorePackageController.adminAuth,TorePackageController.deleteData);

//ture guide 
const uploadTudeGuideImage=require('../Middleware/TureGuideImage')
route.get('/tureguide',TureGuideController.adminAuth,TureGuideController.tureguide)
route.post('/tureguide/create',uploadTudeGuideImage.single('photo'),TureGuideController.adminAuth,TureGuideController.tureguide_create)
route.get('/tureguide/delete/:id',TureGuideController.adminAuth,TureGuideController.tureguide_delete)
//testimonials toute
const uploadTestimonialsImage=require('../Middleware/testimonialsImage')
route.get('/testimonials',TestimonialsController.adminAuth,TestimonialsController.testimonials)
route.post('/testimonials/create',uploadTestimonialsImage.single('photo'),TestimonialsController.adminAuth,TestimonialsController.testimonials_create)
route.get('/testimonials/delete/:id',TestimonialsController.adminAuth,TestimonialsController.testimonials_delete)
module.exports = route;