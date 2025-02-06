const userModel = require('../Models/userModel')
const bcriypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const flash=require('connect-flash')

exports.home = (req, res) => {
    const massage=req.flash('massage')
    res.render('User/home',{
        massage,
        data: req.user
    })
}

exports.login = (req, res) => {
    const massage=req.flash('massage')
    res.render('User/login',{
        massage,
        data: req.user
    })
}


exports.newUser = (req, res) => {
    const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: bcriypt.hashSync(req.body.password, bcriypt.genSaltSync(10))
    })
    user.save((err, data) => {
        if (!err) {
            req.flash('massage',"User Regiseter Successfully...")
            res.redirect('/login')
        } else {
            console.log(err, 'User Not Added');
        }
    })
}

exports.loginPost = (req, res) => {
    userModel.findOne({
        email: req.body.email
    }, (err, data) => {
        if (data) {
            if (data.status==true) {
                const pwd = data.password;
                if (bcriypt.compareSync(req.body.password, pwd)) {
                    const token = jwt.sign({
                        id: data._id,
                        name: data.name,
                        phone: data.phone,
                        email: data.email
                    }, process.env.JWT_SECRET, { expiresIn: "50m" });
                    res.cookie('userToken', token)
                    res.redirect('Dashbord');
                } else {
            req.flash('massage',"Password Not Match.....")
                    
                    console.log("Password Not Match.....");
                    res.redirect('/login')
                }
            } else {
            req.flash('massage',"Email Not Exist.......")

                console.log('Email Not Exist.......');
                res.redirect('/login')
            }
        }
    })
}

exports.dashbord = (req, res) => {
    res.render('User/dashboard', {
        data: req.user
    })
}
exports.userAuth = (req, res, next) => {
    if (req.user) {
        console.log(req.user);
        next()
    } else {
        console.log( 'Error While Auth');
        res.redirect('/login')
    }
}

exports.logout = (req, res) => {
    res.clearCookie("userToken")
    res.redirect('/login')
}



