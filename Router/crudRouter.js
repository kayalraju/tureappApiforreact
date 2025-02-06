const express=require('express')
const CrudController = require('../Controller/CrudController')
const productImageUpload = require('../helper/productImage')
const router=express.Router()

//for api Route
router.post('/product/create',productImageUpload.single('image'),CrudController.createProduct)
router.get('/product',CrudController.showProduct)
router.get('/product/:id',CrudController.findProduct)
router.post('/product/update/:id',productImageUpload.single('image'),CrudController.updateProduct)
router.delete('/product/delete/:id',CrudController.deleteProduct)

module.exports=router