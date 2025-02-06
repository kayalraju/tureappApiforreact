const mongoose = require('mongoose');
const schema = mongoose.Schema
const testimonialsSchema = schema({
    name: {
        type: String,
        require: true
    },
    designation: {
        type: String,
        require: true
    },
    comment: {
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

const testimonialsModel = mongoose.model("testimonials", testimonialsSchema)

module.exports = testimonialsModel