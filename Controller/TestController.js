const Student=require('../Models/TestModel')
const ProductModel=require('../Models/product')
const path=require('path')
const slugify=require('slugify');
const { Validator } = require("node-input-validator");
const StudentModel=require('../Models/student')

const adminAuth = (req, res, next) => {
    if (req.admin) {
       // console.log(req.admin);
        next();
    } else {
        //console.log('Err While Admin Auth');
        res.redirect('/login')
    }
}

const testView=(req,res)=>{
    Student.find((err,data)=>{
        if(!err){
            res.render('Admin/TestApi', {
                message:req.flash('message'),
                error:req.flash('error'),
                studentData: data,
                adminData: req.admin
            })
        }
    }) 
}

const create=(req,res)=>{
     //console.log(req.body);
     const stu=Student({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        city:req.body.city,
        image:req.file ? req.file.path:"https://www.kindpng.com/picc/m/235-2351000_login-icon-png-transparent-png.png"
    })
    
    stu.save().then((result)=>{
        res.redirect('/user')
        console.log(result);
        
    }).catch((error)=>{
        console.log(error);
    })

}

//delete
const deleteData = (req, res) => {
    Student.findByIdAndDelete({ _id: req.params.id }).then((result) => {
        req.session.message = {
          type: "success",
          message: "Deleted successfully!!",
        };
        res.redirect("/user");
      });
    
}

//*********Api Test */
const createUser=async(req,res)=>{
    try {
         // Get user input
         const {name, email, phone,city } = req.body;
         // Validate user input
         if (!(email && phone && name && city)) {
            return res.status(400).send({
                status:400,
                message:"All input is required"
            });
         }
         const user = await Student.findOne({ email:req.body.email });
         if(user){
            return res.status(400).send({
                status:400,
                message:"This Email Id Already exist"
            });
         }
        const StudentData = new Student({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          city:req.body.city,
        });
        if(req.file){
            StudentData.photo=req.file.path
           }
      const result= await StudentData.save()
     return res.status(200).send({
        status: 200,
        message: "data Added Successfully",
        data:result
      });
      } catch (error) {
       return res.status(400).send({
          status: 400,
          msg: "data not added. Please recheck your code !",
        });
      }

}

const allUser=async(req,res)=>{
    try{
        const all=await Student.find({},{__v:0});
       return res.status(200).send({
        success: 200,
        counTotal: all.length,
        message: "All data fetch",
        data: all,
        });
      }catch (error) {
        console.log(error);
       return res.status(500).send({
            success: false,
            message: "Erorr in getting fetch data",
          error: error.message,
        });
      }

}

//*****product create */

const productCreate=async(req,res)=>{
    const v = new Validator(req.body, {
        name: 'required|minLength:3',
    });
    console.log(v);
    let matched = await v.check().then((val) => val);
    if (!matched) {
        return res.status(404).json({
            status: false,
            error: v.errors,
        });
    }
    // const file = req.file;
    // if(!file) return res.status(400).send('No image in the request')

    // const fileName = file.filename
    // const basePath = `${req.protocol}://${req.get('host')}/productimage/`;

    //**for multiple */
    const files = req.files
         let imagesPaths = [];
         const basePath = `${req.protocol}://${req.get('host')}/productimage/`;

         if(files) {
            files.map(file =>{
                imagesPaths.push(`${basePath}${file.filename}`);
            })
         }
         const { name } = req.body;
    let prod = new ProductModel({
        name,
        description: req.body.description,
        //for single image
        //image: `${basePath}${fileName}`,// "http://localhost:3000/productimage/image-2323232"
        //**for multiple */
        image: imagesPaths,
        brand: req.body.brand,
        price: req.body.price,
        slug: slugify(name),
    })

   const pro = await prod.save();

    if(!pro) {
        return res.status(500).send(
            {
                message:"product can not be create"
            }
        )
    }else{
        return res.status(500).send({
            data:pro,
            message:"product added successfully"
        }) 
    }

}

 const allproduct=async(req,res)=>{
    try{
        const all=await ProductModel.find({},{__v:0});
       return res.status(200).send({
        success: 200,
        counTotal: all.length,
        message: "All data fetch successfully",
        data: all,
        });
      }catch (error) {
        console.log(error);
       return res.status(500).send({
            success: false,
            message: "Erorr in getting fetch data",
          error: error.message,
        });
      }
 }

 const productdetails=async(req,res)=>{
    const slug=req.params.slug
    const details= await ProductModel.getBySlug(slug)
    res.status(200).json({
        status:true,
        message:"success",
        data:details
    })
 }


 //***Student controller */
const StudentCreate=async(req,res)=>{

    const v = new Validator(req.body, {
        name: 'required|minLength:3',
        email: "required|email",
        phone: 'required|numeric|minLength:10',
        city: 'required|string|minLength:3',
        address: 'required|minLength:3',
        state: 'required|minLength:3',
        section: 'required|minLength:3',
        classes: 'required|minLength:1',
    });
    //console.log(v);
    let matched = await v.check().then((val) => val);
    if (!matched) {
        return res.status(404).json({
            status: false,
            error: v.errors,
        });
    }
    
    const { name,email,phone,city,address,state,section,classes } = req.body;
    const exisitingname = await StudentModel.findOne({ name });
        //exisiting user
        if (exisitingname) {
            return res.status(500).json({
                success: false,
                message: "Already Register this name please put unique name",
            });
        }
    let std = new StudentModel({
        name,
       email,city,phone,address,state,section,classes,
        slug: slugify(name),
    })

   const stu = await std.save();
    if(!stu) {
        return res.status(500).json(
            {
                message:"student can not be create"
            }
        )
    }else{
        return res.status(200).json({
            data:stu,
            message:"student added successfully"
        }) 
    }
}


const Studentshow=async(req,res)=>{
    try{
        const all=await StudentModel.find({},{__v:0});
       return res.status(200).json({
        success: 200,
        Totaldata: all.length,
        message: "All data fetch successfully",
        data: all,
        });
      }catch (error) {
        console.log(error);
       return res.status(500).send({
            success: false,
            message: "Erorr in getting fetch data",
          error: error.message,
        });
      }

}


const Studentsingle=async(req,res)=>{
    //const slug=req.params.slug
    const details= await StudentModel.find({ slug: req.params.slug })
    res.status(200).json({
        status:true,
        message:"success",
        data:details
    })
}



module.exports={
    testView,adminAuth,
    create,deleteData,createUser,
    allUser,productCreate,
    allproduct,productdetails,
    StudentCreate,
    Studentshow,
    Studentsingle
}