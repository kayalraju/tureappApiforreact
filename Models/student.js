const mongoose = require('mongoose');
const schema = mongoose.Schema
const newSchema =new schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    section: {
        type: String,
        required: true,
      },
    classes:{
      type:String,
      required: true,
    },
    slug: {
        type: String,
        lowercase: true,
      },
   
})

const studentSchema = mongoose.model("studentmodel", newSchema)

module.exports = studentSchema