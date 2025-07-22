const { UserModel } = require('../model/user.js');

async function getToken(userId) {
    const user = await UserModel.findById(userId);
    const Token = user.generateToken(); 
    return Token
}


const signup = async (req, res) => {
   
        const { username, email, password, role } = req.body;
       try {  

         if(!username || !email || !password ||!role){
            return res.status(401).json({success:false,message:"All fields are required"});
         }
         if(password.length<8){
            return res.status(401).json({success:false,message:"Password length must be 8"});
         }
        const existUser = await UserModel.findOne({ email });

        if (existUser) {
            return res.status(401).json({ sucess: false, message: "User already exist" });
        }
        //we need to create user 
        const user = new UserModel({
            name: username,
            email,
            password,
            role
        })
        await user.save();
        const Token = await getToken(user._id);  
       

        const loggedInUser = await UserModel.findById(user._id).
            select("-password ");
    
        const options = {
            httpOnly: true,
            secure: true,
            maxAge: 2 * 24 * 60 * 60 * 1000 
        }

        return res
            .status(200)
            .cookie("Token", Token, options)          
            .json({ success: true, message: "User successfully registered", loggedInUser });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}

const login = async (req, res) => {
        const { email, password } = req.body;
 try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const result = await user.isPasswordCorrect(password);
        if (!result) {
            return res.status(401).json({ success: false, message: "Password is wrong" });
        }
        const Token = await getToken(user._id);
    
        const loggedInUser = await UserModel.findById(user._id);
        const options = {
            httpOnly: true,
            secure: true,
           
            maxAge: 2 * 24 * 60 * 60 * 1000 
        }
        
        res .status(200)
            .cookie("Token", Token, options)
            .json({ success: true, message: "User loggedIn successfully", loggedInUser })
    } catch (error) {
        
         res.status(500)
            .json({ success: false, message: error.message });
    }
}

const logout = async (req, res) => {
   try {
     const options={
         httpOnly:true,
         secure:true,
         
     }
     return res
         .status(200)
         .clearCookie("Token",options)
         .json({success:true,message:"User successfully logged out"})
   } catch (error) {
       return  res
              .status(500)
              .json({success:false,message:error.message})
   }
}

const verify = async(req,res)=>{
    res.status(200).json({
    success: true,
    message: "User authenticated",
    user: req.user,
  });
}

module.exports = {
    signup, login, logout , verify
}

