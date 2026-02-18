import express from "express"
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import noteRoute from "./routes/noteRouter.js";


const app=express();
dotenv.config();
connectDb();
const port=process.env.PORT ;

app.use(express.json());
app.use(cookieParser()); 

app.use('/api/users',userRoute);
app.use('/api/notes',noteRoute)




app.get('/' ,function(req,res){
     res.status(200).json({
      msg:"the route is correct"
     })
});
console.log(port);
app.listen(port,function(){
  console.log(`server is runnning on port ${port}`)
})