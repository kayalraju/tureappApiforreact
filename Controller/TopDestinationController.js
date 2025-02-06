const DestinationModel=require('../Models/topdestination')
const slugify=require('slugify');


const topdestination=(req,res)=>{
    DestinationModel.find((err,data)=>{
        if(!err){
            res.render('Admin/topdestination', {
                message:req.flash('message'),
                error:req.flash('error'),
                adminData: req.admin,
                destination:data
            })
        }
    })    
}

const destination_create=(req,res)=>{
    const { place } = req.body;
    const about=new DestinationModel({
        place,
        city:req.body.city,
        destination_details:req.body.destination_details,
        slug: slugify(place),
       })
       if(req.file){
        about.photo=req.file.path
       }
    //for multiple image
    //    if(req.files){
    //     let path=''
    //     req.files.forEach(function(files,index,arr){
    //         path=path + files.path + ','
    //     })
    //     path=path.substring(0,path.lastIndexOf(","))
    //     about.photo=path
    //    }
         about.save().then((result)=>{
             req.flash('message','create data Successfully');
            res.redirect('/destination');
        }).catch((err)=>{
            req.flash('error','you can not sent empty data')
            res.redirect('/destination');
        }); 
}


//delete
const deleteData = (req, res) => {
    DestinationModel.findByIdAndDelete({ _id: req.params.id }).then((result) => {
        req.session.message = {
          type: "success",
          message: "Deleted successfully!!",
        };
        res.redirect("/destination");
      });
    
}

//edit

const editData=(req,res)=>{
    const id = req.params.id;
    DestinationModel.findById(id,(err,data)=>{
        if(!err){
            res.render('Admin/editDestination', {
                message:req.flash('message'),
                error:req.flash('error'),
                adminData: req.admin,
                destination:data
            })
        }
    })
    
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
    adminAuth,topdestination,destination_create,deleteData,editData
}