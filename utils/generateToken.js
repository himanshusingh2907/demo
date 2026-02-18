import jwt from "jsonwebtoken"

export const generateToken=(res,userId) =>{

    const accessToken=jwt.sign({id:userId},process.env.JWT_ACCESS_SECRET,{expiresIn:"15m"});


    // refresh token 
    const refreshToken=jwt.sign({
      id:userId
    },process.env.JWT_REFRESH_SECRET,{expiresIn:"7d"});
  
  // acces token  cookies 
 res.cookie("accessToken", accessToken, {
  httpOnly: true,
  sameSite: "lax",
  secure: false,
  maxAge: 15 * 60 * 1000,
});

  res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  sameSite: "lax",
  secure: false,
  maxAge: 7 * 24 * 60 * 60 * 1000,
});



}