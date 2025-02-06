const mongoose = require('mongoose');
const schema = mongoose.Schema
const newSchema =new schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    image:{
        type:String,
        default:"https://www.kindpng.com/picc/m/235-2351000_login-icon-png-transparent-png.png"
    },
    answer: {
        type: String,
        required: true,
      },
    admin:{
      type:Boolean,
      default:false
    },
    status: {
        type: Boolean,
        default: true
    }
})

const userSchema = mongoose.model("users", newSchema)

module.exports = userSchema