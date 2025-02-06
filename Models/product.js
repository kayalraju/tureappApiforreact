const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    // image: {
    //     type: String,
    //     default: ''
    // },
    image: [{
        type: String
    }],
    brand: {
        type: String,
        default: ''
    },
    price : {
        type: Number,
        default:0
    },
    slug: {
        type: String,
        lowercase: true,
      },
    
    
})

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});


const proModel = mongoose.model("product", productSchema)

module.exports = proModel