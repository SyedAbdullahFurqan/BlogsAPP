const mongoose = require("mongoose");
const bcrypte=require("bcrypt")
const secrute="hellothis"
const jwt=require("jsonwebtoken")
const userSchema=  new  mongoose.Schema({
NAMES:{type:String,required:true},
emails:{type:String,required:true},
password:{type:String,required:true},
imges:{type:String,required:true,default:"/imges/bags.jpg"},

roles:{ type:String, enum:["user","admin"], default:"user" }
},{timestamps:true})


userSchema.pre("save",async function(next){

const userssss=  this
 if (!userssss.isModified("password")) return next();

try {
       const salt= await bcrypte.genSalt(10)
 const hashed=     await bcrypte.hash(userssss.password,salt)
userssss.password=hashed
next()
} catch (error) {
    console.log(error)
}

})



const User=mongoose.model("User",userSchema)
module.exports=User