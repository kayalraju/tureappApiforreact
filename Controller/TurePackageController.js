const PackageModel=require('../Models/turepackage')
const path=require('path')
const fs = require('fs');


const package=(req,res)=>{
    PackageModel.find((err,data)=>{
        if(!err){
            res.render('Admin/turepackage', {
                message:req.flash('message'),
                error:req.flash('error'),
                adminData: req.admin,
                package:data
            })
        }
    })
    
}

const package_create=(req,res)=>{
    const package=new PackageModel({
        location:req.body.location,
        package_name:req.body.package_name,
        days:req.body.days,
        parson:req.body.parson,
        price:req.body.price,
       })
    //    if(req.file){
    //     package.photo=req.file.path
    //    }
       if(req.files){
        let path=''
        req.files.forEach(function(files,index,arr){
            path=path + files.path + ','
        })
        path=path.substring(0,path.lastIndexOf(","))
        package.photo=path
       }
         package.save().then((result)=>{
             req.flash('message','create data Successfully');
            res.redirect('/ture-package');
        }).catch((err)=>{
            req.flash('error','you can not sent empty data')
            res.redirect('/ture-package');
        }); 

}

//delete
const deleteData = (req, res) => {
    PackageModel.findByIdAndDelete({ _id: req.params.id }).then((result) => {
        req.session.message = {
          type: "success",
          message: "deleted successfully!!",
        };
        res.redirect("/ture-package");
      });
    
}



const adminAuth = (req, res, next) => {
    if (req.admin) {
       // console.log(req.admin);
        next();
    } else {
        //console.log('Err While Admin Auth');
        res.redirect('/login')
    }
}

module.exports={
    adminAuth,package,package_create,deleteData  
}