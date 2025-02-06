const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');

const hashPassword=async(password)=>{
    try{
        const saltPassword=10;
        const hashPassword=await bcrypt.hash(password,saltPassword)
        return hashPassword;
    }catch(error){
        console.log(error);
    }

}

const comparePassword = async (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword);
  };

const createToken = async (id) => {

    try {
        const token = await jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return token;

    } catch (error) {
        // res.status(400).send(error.message);
        console.log(error);
    }
}
//***Auth check */
const veryfyToken = async (req, res, next) => {

    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ "status": false, "message": "A token is required for authentication" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({ "status": false, "message": "invalid Token Access" });
    }
    return next();

}

//***another */
const vvvvvrrrryyy=(req, res, next)=> {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  };

  module.exports={
    hashPassword,comparePassword,createToken,veryfyToken
  }