const testimonialsModel = require('../Models/testimonials')
const TrstimonialsModel=require('../Models/testimonials')

const testimonials=(req,res)=>{
    TrstimonialsModel.find((err,data)=>{
        if(!err){
            res.render('Admin/testimonials',{
                message:req.flash('message'),
                error:req.flash('error'),
                adminData: req.admin,
                testimonialsData:data
            })
        }
    })
}

const testimonials_create=(req,res)=>{
    const Testimonials=new testimonialsModel({
        name:req.body.name,
        designation:req.body.designation,
        comment:req.body.comment,
    })
    if(req.file){
     Testimonials.photo=req.file.path
    }
      Testimonials.save().then((result)=>{
          req.flash('message','create data Successfully');
         res.redirect('/testimonials');
     }).catch((err)=>{
         req.flash('error','you can not sent empty data')
         res.redirect('/testimonials');
     }); 

}

const testimonials_delete=(req,res)=>{
    testimonialsModel.findByIdAndDelete({ _id: req.params.id }).then((result) => {
        req.session.message = {
          type: "success",
          message: "deleted successfully!!",
        };
        res.redirect("/testimonials");
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
    testimonials,adminAuth,testimonials_create,testimonials_delete
}