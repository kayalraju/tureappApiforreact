const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchemaTest = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]

    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    }, 
}, { timestamps: true })

const ProductModelTest = mongoose.model('testproduct', ProductSchemaTest)
module.exports = ProductModelTest