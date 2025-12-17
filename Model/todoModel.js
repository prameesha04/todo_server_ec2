//define ur model schema

import mongoose from "mongoose";
//todo document structure
const todoSchema = mongoose.Schema({
  todo:{
    type: String, 
    required: true,
    unique: true,
  }
});
//we are creating collection with name called todos with todoSchema
const todoCollection = mongoose.model("todos", todoSchema);
export default todoCollection;
