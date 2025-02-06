const mongoose = require('mongoose');
const schema = mongoose.Schema
const aboutSchema = schema({
    title: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    // photo: {
    //     data: Buffer,
    //     contentType: String,
    //   },
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

const aboutModel = mongoose.model("about", aboutSchema)

module.exports = aboutModel