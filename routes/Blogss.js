// const multer = require("multer");

// const express = require("express");

//  const appss= express.Router()

// const Blogs = require("../models/Blogs");

// const storage=multer.diskStorage({destination:function (req,file,cb) {
//   return cb(null,"./uploads")
// },filename:function (req,file,cb) {
//   return cb(null,`${file.originalname}`)
// }})
// const upload=multer({storage})





// appss.post("/img",upload.single("imgFile"),async(req,res) =>{
//   console.log(req.body);
//   const {Title,description}=req.body

// await  Blogs.create({
//   imgFile:`./uploads/${req.file.filename}`,
// Title,
// description,
// createdBy:req.user?.id

// })

//   console.log(req.file);  
//  return res.json({msg:req.body,file:req.file}); 
// })
// module.exports=appss