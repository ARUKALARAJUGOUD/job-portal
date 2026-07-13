import mongoose from "mongoose";
const skillSchema = new mongoose.Schema({
  name:{
    type:String,
    unique:true
  }
})

export const Skill = mongoose.model("Skill",skillSchema)