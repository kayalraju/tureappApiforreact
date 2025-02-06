const DestinationDetails=require('../Models/destination_detail')
const Destination=require('../Models/topdestination')



const destinationDetails=(req,res)=>{
    DestinationDetails.find().then(result1 => {
        Destination.find().then(result2 => {
            res.render('Admin/destination_details', {
                title: "Add | Review",
                message:req.flash('message'),
                error:req.flash('error'),
                displayData1: result1,
                destinations: result2,
                adminData: req.admin,
            })
        })
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
    adminAuth,destinationDetails
}