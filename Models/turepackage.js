const mongoose = require('mongoose');
const schema = mongoose.Schema
const TurepackageSchema = schema({
    location: {
        type: String,
        require: true
    },
    package_name: {
        type: String,
        require: true
    },
    days: {
        type: String,
        require: true
    }, 
    parson: {
        type: String,
        require: true
    }, 
    price: {
        type: String,
        require: true
    }, 
    photo: {
        type: String,
    },
    
    status: {
        type: Boolean,
        default: true
    }
},
{ timestamps: true }
)

const TurepackageModel = mongoose.model("turepackage", TurepackageSchema)

module.exports = TurepackageModel