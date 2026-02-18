import express from "express"
import { createNote, deleteNote, getNotesOfLoginUser, updateNote } from "../controllers/noteController.js";
import UserAuthentication from "../middlewares/userAuth.js";

const noteRoute=express.Router();

noteRoute.post('/createNote',UserAuthentication,createNote);
noteRoute.get('/getNote',UserAuthentication,getNotesOfLoginUser);
noteRoute.put("/:noteId", UserAuthentication,updateNote );
noteRoute.delete("/:noteId",UserAuthentication,deleteNote)



export default noteRoute;