const express = require("express");
const user=require("../models/User.js")
const route=express.Router()
const bcryptes=require("bcrypt")
const {tokenss,Verify} =require("../Service/Autho.js");
const { verify } = require("jsonwebtoken");






route.get("/home",(req,res)=>{
 return  res.render("Home", {
      users: req.user,})
      // res.json({userss: req.user})

})

route.get("/login",(req,res)=>{
return   res.render("Signin")
})
route.get("/signup",(req,res)=>{
return   res.render("Signup")
})

route.get("/logout", (req, res) => {
  res.clearCookie("tookens"); // same cookie name you set
  return res.redirect("/home");
});








route.post("/",async(req,res)=>{
 const {NAMES,emails,password}     = req.body

 const exist=  await   user.findOne({emails})
  console.log(exist)
if (exist) return res.send("email is alerdy exist")

const created= await user.create({
NAMES,
emails,
password

})
if (created) {

   return res.redirect("/register/login")
}
})

route.post("/logins",async(req,res)=>{
 const {emails,password}     = req.body
try {
    const exists=  await   user.findOne({emails})
 console.log(exists)
if (!exists) return res.send("invalid emails")

const compare = await bcryptes.compare(password, exists.password)
console.log(compare)

const tokkens=await tokenss(exists)
console.log(tokkens,"tokebss")

if(!compare) return res.send("invalid password")

if (compare) {
   return res.cookie("tookens",tokkens).redirect("/")
  }
} catch (error) {
   return res.render("Sigin",{error:"invalid emial or password"})
}

})


module.exports=route