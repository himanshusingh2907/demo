import User from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt"
import registerSchema from "../utils/validator/userValidator.js";
import LoginSchema from "../utils/validator/userLoginValidation.js";
import jwt from "jsonwebtoken"
import UserAuthentication from "../middlewares/userAuth.js";
export const CreateAccount=async(req,res)=>{
   try {
    const result=registerSchema.safeParse(req.body);
    if (!result.success) {
     return  res.status(400).json({
        message:"plss enter valid input",
        errors:result.error.errors,
      });
    }
    console.log("Zod result",result);
    const {username,email,password}=result.data;
    
    const userExist=await User.findOne({email});
    if (userExist) {
      return res.status(409).json({
        message:"user already exist plss login "
      });
    }
   // console.log("ZOD RESULT:", result);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser=await User.create({
      username,
      email,
      password:hashedPassword
    });
  //  console.log("password is ", password);
    generateToken(res,newUser._id);
   return res.status(201).json({
       id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    })

   }
   catch (error) {
    return res.status(500).json({
      message:error.message
    })
   }
}

export const signIn=async(req,res)=>{
  try {
    const result = LoginSchema.safeParse(req.body);
    if(!result.success) {
      return res.status(401).json({
       message:"plss enter a valide inputs"
      })
    }
    const {email,password} =result.data;
    const userExist=await User.findOne({email});
    if (!userExist) {
      return res.status(401).json({
        message:"user does not exist"
      })
    }
    const isMatch=bcrypt.compare(password,userExist.password);
    if (!isMatch){
      return res.status(401).json({
        message:"password does not much"

      })
    }
    generateToken(res,userExist._id);
    return res.status(201).json({
      username:userExist.username,
      email:userExist.email
    })
  }
  catch(error) {
    return res.status(500).json({
      message:error.message
    })
  }
}

export const getMe=async(req,res)=>{
  try {
    const user=await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(409).json({
        message:"user not found"
      });
    }
    return res.status(201).json({
      user
    })
  }
  catch(error) {
    return res.status(500).json({
      message:error.message
    })
  }
}

export const generateAccesToken=async(req,res)=>{
  try {
    const refreshtoken=req.cookies.refreshToken;
    if (!refreshtoken){
      return res.status(401).json({
        message:"you are not authorize"
      })
    }
    const decode=jwt.verify(refreshtoken,process.env.JWT_REFRESH_SECRET);
    const newAccessToken=jwt.sign({id:decode.id},process.env.JWT_ACCESS_SECRET,{expiresIn:"15m"})
    res.cookie("accesToken",newAccessToken,{
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    })
    return res.status(201).json({
      message:"the token is generated"
    })
  }
  catch(error) {
    return res.status(500).json({
      message:error.message
    })
  }
}


export const Logout=(req,res)=>{
  res.clearCookie("accesstoken",{
    httpOnly:true,
    secure:true,
    sameSite:"lax"

  })
  res.clearCookie("refreshtoken",{
    httpOnly:true,
    secure:true,
    sameSite:"lax"

  })

  return res.status(201).json({
    message:"the user is logout "
  })
}