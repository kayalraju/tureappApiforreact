const mongoose=require('mongoose')
const Schema=mongoose.Schema
const StudentSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    image:{
        type:String,
        default:"https://www.kindpng.com/picc/m/235-2351000_login-icon-png-transparent-png.png"
    },
    photo: {
        type: String,
    },
    status:{
        type:Number,
        default:1
    }
},
{timestamps:true}
)
module.exports=mongoose.model('student',StudentSchema)