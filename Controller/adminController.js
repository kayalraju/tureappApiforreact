// const adminModel = require('../Models/adminModel')
const bcriypt = require('bcryptjs')
const adminModel = require('../Models/userModel')
const Banner=require('../Models/banner')
const jwt = require('jsonwebtoken')
const slugify=require('slugify');
const flash = require('connect-flash');
const fs = require('fs');

exports.adminLogin = (req, res) => {
    const massage=req.flash('massage')
    res.render('Admin/login',{massage})
}

exports.adminReg = (req, res) => {
    const user = new adminModel({
        name: req.body.name,
        email: req.body.email,
        password: bcriypt.hashSync(req.body.password, bcriypt.genSaltSync(10))
    })
    user.save((err, data) => {
        if (!err) {
            //console.log('Admin  Added......');
            res.redirect('/login')
        } else {
           // console.log(err, 'Admin Not Added');
        }
    })
}

exports.loginPost = (req, res) => {
    adminModel.findOne({
        email: req.body.email
    }, (err, data) => {
        if (data) {
            if (data.status==false) {
                if(data.admin==true){
                    const pwd = data.password;
                    if (bcriypt.compareSync(req.body.password, pwd)) {
                        const token = jwt.sign({
                            id: data._id,
                            name:data.name,
                            email: data.email
                        }, process.env.JWT_SECRET, { expiresIn: "10h" });
                        res.cookie('adminToken', token)
                        res.redirect('/');
                    } else {
                     req.flash('massage',"Password Not Match.....")

                        //console.log("Password Not Match.....");
                        res.redirect('/login')
                    }
                }else{
                    req.flash('massage',"You are not Admin")

                    //console.log("Admin False...");
                    res.redirect('/login')
                }
             
            } else {
                req.flash('massage',"Email Not Exist.......")

                //console.log('Email Not Exist.......');
                res.redirect('/login')
            }
        }
    })
}

exports.adminDeshbord = (req, res) => {
    res.render('Admin/dashbord', {
        adminData: req.admin
    })
}
exports.adminAuth = (req, res, next) => {
    if (req.admin) {
       // console.log(req.admin);
        next();
    } else {
        //console.log('Err While Admin Auth');
        res.redirect('/login')
    }
}

exports.logout = (req, res) => {
    res.clearCookie("adminToken")
    res.redirect('/login')
}
exports.banner=(req,res)=>{
    Banner.find((err,data)=>{
        if(!err){
            res.render('Admin/banner', {
                message:req.flash('message'),
                error:req.flash('error'),
                bannerData: data,
                adminData: req.admin
            })
        }
    }) 
}

exports.banner_create=(req,res)=>{
    const { title, subtitle} = req.fields;
    const { photo } = req.files;
    const banner = new Banner({ ...req.fields, slug: slugify(title) });
    if (photo) {
      banner.photo.data = fs.readFileSync(photo.path);
      banner.photo.contentType = photo.type;
    }
     banner.save().then((result)=>{
         req.flash('message','create banner Successfully');
        res.redirect('/banner');
    }).catch((err)=>{
        req.flash('error','you can not sent empty data')
        res.redirect('/banner');
    }); 
}

//Banner Photo
exports.bannerphoto = async(req, res) => {
    try {
        const bphoto = await Banner.findById(req.params.bid).select("photo");
        if (bphoto.photo.data) {
          res.set("Content-type", bphoto.photo.contentType);
          return res.status(200).send(bphoto.photo.data);
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Erorr while getting photo",
          error,
        });
      }
    
}

//delete
exports.bannerDelete = (req, res) => {
    Banner.findByIdAndDelete({ _id: req.params.id }).then((result) => {
        req.session.message = {
          type: "success",
          message: "banner deleted successfully!!",
        };
        res.redirect("/banner");
      });
    
}