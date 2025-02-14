const { hashPassword, createToken, comparePassword } = require('../Middleware/AuthHelper');
const userModel = require('../Models/userModel')
const JWT = require('jsonwebtoken');


//**register  */
const register = async (req, res) => {
    try {
        const { name, email, password, phone,  answer } = req.body;
        //validation
        if (!name) {
            return res.send({ message: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" });
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" });
        }
        //check user
        const exisitingUser = await userModel.findOne({ email });
        //exisiting user
        if (exisitingUser) {
            return res.status(500).send({
                success: false,
                message: "Already Register this Email please login",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({
            name,
            email,
            phone,
            password: hashedPassword,
            answer,
        }).save();

        const tokendata = await createToken(user._id)
        return res.status(201).send({
            success: 200,
            message: "User Register Successfully",
            data: user,
            token: tokendata
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: 500,
            message: "Errro in Registeration",
            error,
        });
    }

}

//**login  */
const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email is not registerd",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).json({
                success: false,
                message: "Invalid Password",
            });
        }
        const token = await JWT.sign({
             _id: user._id,
             name:user.name,
             email:user.email,
             phone:user.phone, 
            },"hekeekhfhalfhjksadkjsdd", { expiresIn: "4h" });
       return res.status(200).json({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                answer: user.answer,
            },
            token,
        });
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            success: false,
            message: "Errro in login",
            error,
        });
    }


}

//update password
const update_password = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const password = req.body.password;

        //check userid exist ir not
        const data = await userModel.findOne({ _id: user_id });
        if (data) {
            const newPassword = await hashPassword(password);
            const userData = await userModel.findByIdAndUpdate({ _id: user_id }, {
                $set: {
                    password:newPassword
                }
            })
           return res.status(201).send({ success: true, "message": "your password hasbeen updated" });
        } else {
          return  res.status(400).send({ succses: false, "message": "user id Not found" })
        }

    } catch (error) {
        return res.status(400).send(error.message)
    }
}

//forget password
const forgetPassword=async(req,res)=>{
    try{
        const{email,answer,newPassword}=req.body;
        if(!email){
           return res.status(400).send({message:"Email is required"})
        }
        if(!answer){
            return  res.status(400).send({message:"Answer is required"})
        }
        if(!newPassword){
            return  res.status(400).send({message:"New Password is required"})
        }
        //check email exist or not
        const user=await userModel.findOne({email,answer});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"wrong Email or Answer"})
        }
        const heased=await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{
            password:heased
        })
        return res.status(200).send({
            success:true,
            message:"Password Reset Successfully"})

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Errro in forget password",
            error,
        });
    }

}

//protected route
const dashboard=(req,res)=>{
    return res.status(201).json({ 
        success: true,
        user:req.user, 
        msg: "Welcome 🙌 Your are Authenticate user"})
}

//get user profile after login
const profile=async(req,res,next)=>{
    if (req.user) {
       return res.send(req.user);
        next();
      } 
      else {
       return res.status(401).json({ message: 'Invalid token' });
      }

}

//check authenticated or not
const user=(req,res,next)=>{
    if (req.user) {
         next();
     } else {
        return res.status(401).json({ message: 'Unauthorized user!!' });
     }
}



module.exports = {
    register,
     login,
     dashboard,
     user,
     profile,
     update_password,
     forgetPassword
}