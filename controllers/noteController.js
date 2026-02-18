import Note from "../models/Notes.js";
import noteSchema from "../utils/validator/noteValidator.js";
import mongoose from "mongoose"

export const createNote=async(req,res)=>{
  try {
    const result=noteSchema.safeParse(req.body);
    console.log("zod results",result);
    if (!result.success) {
      return res.status(409).json({
        message:"invalid inputs"
      })
    }
    const {title,description,tags,isPinned,isArchived}=result.data;
    const user=req.user.id;
    const newNote=await Note.create({
      user,
      title,
      description,
      tags,
      isPinned,
      isArchived
    })
    return res.status(201).json({
      newNote
    })
  }
  catch(error) {
    return res.status(401).json({
      message:error.message
    })
  }
}

export const getNotesOfLoginUser=async(req,res)=>{
  try {
    const userId=req.user.id;
    if(!userId) {
      return res.status(409).json({
        message:"user is not authorize "
      })
    }
    const notes=await Note.find({user:userId})
    return res.status(201).json({
      notes
    })
  }
  catch(error) {
    return res.status(500).json({
      message:error.message
    })
  }
}

export const updateNote=async(req,res)=>{
  try {
    const {noteId}=req.params;
    const userId=req.user.id;
    // find the note in the note db
    const noteToUpdate=await Note.findById(noteId);
    if (!noteToUpdate) {
      return res.status(401).json({
        message:"this note does not exist"
      })
    };
    if (!noteToUpdate.user.toString() === userId) {
      return res.status(401).json({
        message:"user is not authorize to update teh note"
      })
    }
    const result=noteSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(401).json({
        message:"invalid inputs"
      })
    }
    const {title,description,tags,isPinned,isArchived} =result.data;
    noteToUpdate.title=title;
    noteToUpdate.description=description;
    noteToUpdate.tags=tags;
    noteToUpdate.isPinned=isPinned;
    noteToUpdate.isArchived=isArchived;
    await noteToUpdate.save();
    return res.status(201).json({
      noteToUpdate
    })
    

  }
  catch(error){
    return res.status(500).status({
      message:error.message
    })
  }
}

export const deleteNote=async (req,res)=>{
   try {
    const {noteId}=req.params;
    const userId=req.user.id;
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        message: "Invalid note id",
      });
    }

    // find the note in the note db
    const noteToDelete=await Note.findById(noteId);
    if (!noteToDelete) {
      return res.status(401).json({
        message:"this note does not exist"
      })
    };
    
    if (!noteToDelete.user.toString() === userId) {
        return res.status(401).json({
          message:"user is not authorize to delete the note"
        })
    }

    await noteToDelete.deleteOne();
    return res.status(201).json({
      message:"note is deleted"
    })
    

  }
  catch(error) {
    return res.status(401).json({
      message:error.message
    })
  }

}