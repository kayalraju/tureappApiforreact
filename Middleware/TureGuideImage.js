const path=require('path')
const multer=require('multer')

var storage=multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, path.join(__dirname, '../Public/Aboutimage'), function (error, success) {
        //     if (error) throw error;
        // })
        cb(null,'uploads/')
    },
    filename: function (req, file, cb) {
        // const name = Date.now() + '_' + path.extname(file.originalname) 
        // cb(null, name, function (error1, success1) {
        //     if (error1) throw error1
        // })
        let ext=path.extname(file.originalname)
        cb(null,Date.now() + ext)
    }
})
const uploadTure = multer({
     storage: storage,
     fileFilter:function(req,file,callback){
        if(
            file.mimetype =='image/png'||
            file.mimetype =='image/jpg' ||
            file.mimetype == 'image/jpeg'
            ){
                callback(null,true)

        }else{
            console.log('selete valid image format');
            callback(null,false)
        }
     },
     limits:{
        fieldSize: 1024 * 1024 * 2
     }
     });


     module.exports=uploadTure