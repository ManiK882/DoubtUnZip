const jwt =require('jsonwebtoken');
const {UserModel}=require('../model/user.js');
require('dotenv').config({ path: '.env' })

const verifyJWT=async(req,res,next)=>{
    try {
        const token = req.cookies.Token;    
        if(!token){
            return res
            .status(401)
            .json({message:"Token expired"});
        }
        const decodeToken = jwt.verify(
            token,process.env.JWT_SECRET_KEY
        )
        if(!decodeToken){
            return res
            .status(404)
            .json({message:"Unauthorized User"});
        }
        const user = await UserModel.findById(decodeToken?._id);
        console.log("verifytoken middleware",user);
        req.user=user;
        next();

    } catch (error) {
        return res.json({message:error.message});           
       
    }
}

const verifyFollowing_Educator = async(req,res,next)=>{
    try {
        if(req.user.following.length>=10){
            return res.status(400).json({message:"You can follow upto 10 educator"})
        }
        next();
    } catch (error) {
         return res.json({message:error.message}); 
    }
}
module.exports={verifyJWT,verifyFollowing_Educator};