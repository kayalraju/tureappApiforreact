const userModel = require('../Models/userModel')
const mongoose = require('mongoose');

exports.verifyUser = (req, res, next) => {
    userModel.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            req.flash('massage',"Can't Find Email Address")
            console.log(err, "Can't Find Email Address");
            res.redirect('/')

            return;
        }
        if (user) {
            req.flash('massage',"Email already Exists")
            console.log("Email already Exists");
            res.redirect('/')
            return;
        }
        const password = req.body.password;
        const confiromPW = req.body.confirmpassword;
        if (password !== confiromPW) {
            console.log("password and confirm password doesn't match");
            return;
        }
        next();
    })
}