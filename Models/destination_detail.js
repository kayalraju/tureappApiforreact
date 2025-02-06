const mongoose = require('mongoose');
const Schema = mongoose.Schema
const DestinationDetailsSchema = Schema({
    destination_names: {
        type: String,
        require: true
    },
    destinationId:{
        type:Schema.Types.ObjectId,
        ref:"destination"
    }, 
    photo: {
        type: Array,
    },
    
    status: {
        type: Boolean,
        default: true
    }
},
{ timestamps: true }
)

const destinationdetailsModel = mongoose.model("destination_detail", DestinationDetailsSchema)

module.exports = destinationdetailsModel