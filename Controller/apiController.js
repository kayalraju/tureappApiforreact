const BannerModel = require('../Models/banner')
const AboutModel=require('../Models/about')
const Destination=require('../Models/topdestination')
const PackageModel=require('../Models/turepackage')
const Guide=require('../Models/tureguide')
const TestimonialsModel=require('../Models/testimonials')

//banner photo
const Bannerphoto = async (req, res) => {
  try {
    const bannerphptodata = await BannerModel.findById(req.params.cid).select("photo");
    if (bannerphptodata.photo.data) {
      res.set("Content-type", bannerphptodata.photo.contentType);
      return res.status(200).send(bannerphptodata.photo.data);
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
//banner 
const banner = async (req, res) => {
  try {
    const bannerdata = await BannerModel
      .find({}, { __v: 0, })
      .select("-photo")
      .limit(100)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: bannerdata.length,
      message: "All banner ",
      data: bannerdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting testimonials",
      error: error.message,
    });
  }

}

const about=async(req,res)=>{
  try{
    const About=await AboutModel.find({},{__v:0}).limit(1);
    res.status(200).send({success: true,counTotal: About.length,message: "All data ",
      data: About,
    });
  }catch (error) {
    console.log(error);
    res.status(500).send({success: false,message: "Erorr in getting testimonials",
      error: error.message,
    });
  }
}
//********destinations */
const destination=async(req,res)=>{
  try{
    const destination=await Destination.find({},{__v:0}).sort({_id:-1}).limit(20);
    res.status(200).send({success: true,counTotal: destination.length,message: "All data fetch",
      data: destination,
    });
  }catch (error) {
    console.log(error);
    res.status(500).send({success: false,message: "Erorr in getting Destination",
      error: error.message,
    });
  }
}

//details single destination
const destination_details=async(req,res)=>{
  try {
      const DestinationDetails = await Destination.findOne({ slug: req.params.slug });
     return res.status(200).send({
        success: true,
        message: "Get SIngle destination Successfully",
        data:DestinationDetails,
      });
    } catch (error) {
      console.log(error);
     return res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single destination",
      });
    }

}

//*********Packages */
const packages=async(req,res)=>{
  try{
    const turePackage=await PackageModel.find({},{__v:0}).limit(20);
    res.status(200).send({success: true,counTotal: turePackage.length,message: "All data fetch",
      data: turePackage,
    });
  }catch (error) {
    console.log(error);
    res.status(500).send({success: false,message: "Erorr in getting Destination",
      error: error.message,
    });
  }
}
//*********Guide */
const guide=async(req,res)=>{
  try{
    const tureGuide=await Guide.find({},{__v:0}).sort({_id:-1}).limit(20);
    res.status(200).send({success: true,
      counTotal: tureGuide.length,
      message: "All data fetch",
      data: tureGuide,
    });
  }catch (error) {
    console.log(error);
    res.status(500).send({success: false,
      message: "Erorr getting",
      error: error.message,
    });
  }
}
//*********testimonial */
const testimonial=async(req,res)=>{
  try{
    const Testimonialsdata=await TestimonialsModel.find({},{__v:0}).sort({_id:-1}).limit(20);
    res.status(200).send({success: true,
      counTotal: Testimonialsdata.length,
      message: "All data fetch",
      data: Testimonialsdata,
    });
  }catch (error) {
    console.log(error);
    res.status(500).send({success: false,
      message: "Erorr getting",
      error: error.message,
    });
  }
}

module.exports = {
  banner,
   Bannerphoto,
   about,
   destination,
   packages,
   destination_details,
   guide,
   testimonial
}