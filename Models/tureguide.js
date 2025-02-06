const mongoose = require('mongoose');
const schema = mongoose.Schema
const tureguideSchema = schema({
    name: {
        type: String,
        require: true
    },
    designation: {
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

const tureguidemodel = mongoose.model("tureguide", tureguideSchema)

module.exports = tureguidemodel