const TureGuide=require('../Models/tureguide')
const fs = require('fs');
const path=require('path')


const tureguide=(req,res)=>{
    TureGuide.find((err,data)=>{
        //console.log(data);
        if(!err){
            res.render('Admin/travelguide', {
                message:req.flash('message'),
                error:req.flash('error'),
                adminData: req.admin,
                guideData:data
            })
        }
    })
}


const tureguide_create=(req,res)=>{
    const tureGuides=new TureGuide({
        name:req.body.name,
        designation:req.body.designation,
    })
    if(req.file){
     tureGuides.photo=req.file.path
    }
      tureGuides.save().then((result)=>{
          req.flash('message','create data Successfully');
         res.redirect('/tureguide');
     }).catch((err)=>{
         req.flash('error','you can not sent empty data')
         res.redirect('/tureguide');
     }); 
 
 }

 const tureguide_delete=(req,res)=>{
    TureGuide.findByIdAndDelete({ _id: req.params.id }).then((result) => {
        req.session.message = {
          type: "success",
          message: "deleted successfully!!",
        };
        res.redirect("/tureguide");
      });
}

//for Auth check
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
    adminAuth ,tureguide,tureguide_create,tureguide_delete
}

