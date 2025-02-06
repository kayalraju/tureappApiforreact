const flash = require('connect-flash');
const fs = require('fs');
const AboutModel=require('../Models/about')
const path=require('path')


const about=(req,res)=>{
    AboutModel.find((err,data)=>{
        //console.log(data);
        if(!err){
            res.render('Admin/about', {
                message:req.flash('message'),
                error:req.flash('error'),
                adminData: req.admin,
                aboutData:data
            })
        }
    })
}

// const about_create=(req,res)=>{
//     const { title, desc} = req.fields;
//     const {photo }  = req.files;
//     const about = new AboutModel({ ...req.fields });
//     if (photo) {
//       about.photo.data = fs.readFileSync(photo.path);
//       about.photo.contentType = photo.type;
//     }
//      about.save().then((result)=>{
//          req.flash('message','create data Successfully');
//         res.redirect('/about');
//     }).catch((err)=>{
//         req.flash('error','you can not sent empty data')
//         res.redirect('/about');
//     }); 

// }

const about_create=(req,res)=>{
   const about=new AboutModel({
    title:req.body.title,
    desc:req.body.desc,
   })
//    if(req.file){
//     about.photo=req.file.path
//    }
   if(req.files){
    let path=''
    req.files.forEach(function(files,index,arr){
        path=path + files.path + ','
    })
    path=path.substring(0,path.lastIndexOf(","))
    about.photo=path
   }
     about.save().then((result)=>{
         req.flash('message','create data Successfully');
        res.redirect('/about');
    }).catch((err)=>{
        req.flash('error','you can not sent empty data')
        res.redirect('/about');
    }); 

}

//About Photo
// const aboutphoto = async(req, res) => {
//     try {
//         const bphoto = await AboutModel.findById(req.params.id).select("photo");
//         if (bphoto.photo.data) {
//           res.set("Content-type", bphoto.photo.contentType);
//           return res.status(200).send(bphoto.photo.data);
//         }
//       } catch (error) {
//         console.log(error);
//         res.status(500).send({
//           success: false,
//           message: "Erorr while getting photo",
//           error,
//         });
//       }
    
// }

//delete
const deleteData = (req, res) => {
    AboutModel.findByIdAndDelete({ _id: req.params.id }).then((result) => {
        req.session.message = {
          type: "success",
          message: "banner deleted successfully!!",
        };
        res.redirect("/about");
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
    adminAuth,about,about_create,deleteData
  }



 