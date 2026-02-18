import mongoose from "mongoose"


const NoteSchema= new mongoose.Schema({
   user:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"User",
   required:true,
   },
   title:{
    type:String,
    required:true,
   },
   description:{
    type:String,
    required:true,
   },
   tags:{
    type:[String],
    default:[]
   },
   isPinned:{
    type:Boolean,
    default:false
   },
   isArchived:{
    type:Boolean,
    default:false,
   }
},
{
  timestamps:true
}
);

const Note=mongoose.model("Note",NoteSchema);

export default Note;