const mongoose = require('mongoose');
const schema = mongoose.Schema
const bannerSchema = schema({
    title: {
        type: String,
        require: true
    },
    subtitle: {
        type: String,
        require: true
    },
    photo: {
        data: Buffer,
        contentType: String,
      },
    
    
    status: {
        type: Boolean,
        default: true
    }
},
{ timestamps: true }
)

const bannerModel = mongoose.model("banner", bannerSchema)

module.exports = bannerModel