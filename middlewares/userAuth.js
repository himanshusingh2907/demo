import jwt from "jsonwebtoken"
const UserAuthentication=(req,res,next)=>{
  const accesstoken=req.cookies.accessToken;
   if (!accesstoken) {
      return res.status(401).json({
        message:"not authoorize token does not exist"
      });
    }
  try {
   const decode=jwt.verify(accesstoken,process.env.JWT_ACCESS_SECRET);
   if (!decode) {
    return res.status(401).json({
      message:"Not authorize"
    })
   }
   req.user={id:decode.id};
   next();
  }
  catch(error) {
    return res.status(401).json({
      message:error.message
    })
  }
}
 export default  UserAuthentication;