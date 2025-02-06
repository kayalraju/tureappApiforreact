const mongoose = require('mongoose');
const schema = mongoose.Schema
const TopDestinationSchema = schema({
    place: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    }, 
    photo: {
        type: String,
    },
    destination_details: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        lowercase: true,
      },
    
    status: {
        type: Boolean,
        default: true
    }
},
{ timestamps: true }
)

const destinationModel = mongoose.model("destination", TopDestinationSchema)

module.exports = destinationModel