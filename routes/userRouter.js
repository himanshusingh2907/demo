import express from "express"
import { CreateAccount, generateAccesToken, getMe, Logout, signIn } from "../controllers/userController.js"
import UserAuthentication from "../middlewares/userAuth.js";

const userRoute=express.Router();
userRoute.post('/register',CreateAccount);
userRoute.post('/login',signIn)
userRoute.get('/me',UserAuthentication,getMe);
userRoute.post('/refresh',generateAccesToken)
userRoute.post("/logout",Logout);




export default userRoute;