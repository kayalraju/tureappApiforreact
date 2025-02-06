const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
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
    image: {
        type: String,
        // required: [true, "Image is required"]
    }
}, { timestamps: true })

const ProductModel = mongoose.model('producttrst', ProductSchema)
module.exports = ProductModel