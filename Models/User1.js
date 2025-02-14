const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const UserSchema1 = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    is_verified: { type: Boolean, default: false },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:['user','admin','author'],
        default:'user'
    }

}, {
    timestamps: true
});

const UserModel1 = mongoose.model('user1', UserSchema1);
module.exports = UserModel1;