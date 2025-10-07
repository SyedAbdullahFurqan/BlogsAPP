const mongoose = require("mongoose");
const commontSchema=  new  mongoose.Schema({


Content:{type:String,required:true},
blogID:{type:mongoose.SchemaTypes.ObjectId,ref:"Blogs"},
userID:{type:mongoose.SchemaTypes.ObjectId,ref:"User"}
})

const Comments=mongoose.model("Comment",commontSchema)

module.exports=Comments