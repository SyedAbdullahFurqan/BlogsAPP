const mongoose = require("mongoose");
const blogsSchema=  new  mongoose.Schema({


imgFile:{type:String,required:true},
Title:{type:String,required:true},
description:{type:String,required:true},
createdBy:{type:mongoose.SchemaTypes.ObjectId,ref:"User"}
})

const Blogs=mongoose.model("Blogs",blogsSchema)

module.exports=Blogs