const express = require("express");
require('dotenv').config();
 const app= express()

const Port=process.env.Port 
const path= require("path")

const route =require("./routes/Userss.js")
const mongoose=require("mongoose");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const { check } = require("./middleware/Auth.js");

const Blogs = require("./models/Blogs.js");
const Comments = require("./models/Comment.js");

 mongoose.connect(process.env.Mongodb).then(()=> console.log("connectd")).catch((err)=>{ console.log(err,+"error")})

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.resolve("./public")));
app.use(cookieParser());


app.use("/register",route)
app.use(check('tookens'))
app.get("/", async(req,res)=>{

const Blogss= await Blogs.find({}).populate("createdBy");

 return  res.render("Front",{
users :req.user , // make user available to all ejs

blogss:Blogss||null
 })

})


app.get("/blogs/:id",async(req,res)=>{
    const blogId = req.params.id;

  try {
   
     const vlogs = await Blogs.findById(blogId).populate("createdBy");
    const comments = await Comments.find({blogID:blogId }).populate({
        path: "userID",
        select: "NAMES imges" // only get these fields from User
      })
      .populate({
        path: "blogID",
        populate: { path: "createdBy", select: "NAMES imges" } // populate nested blog author if needed
      });
    if (!vlogs) {
      return res.status(404).send("Blog not found for ID " + req.params.id);
    }


   return res.render("Blogs", {
      users: req.user,
      vlogss: vlogs,
commentss:comments
    });
  } catch (err) {
    console.error("Error fetching blog:", err.message);
    res.status(500).send("Server error");
  }
})

app.post("/comments/:BlogID", async(req,res)=>{
const comman=req.params.BlogID
 
   await Comments.create({Content:req.body.Content,blogID:req.params.BlogID,userID:req.user.id})


 return res.redirect(`/blogs/${comman}`) 
    })


const storage=multer.diskStorage({destination:function (req,file,cb) {
  return cb(null,"./public/uploads")
},filename:function (req,file,cb) {
  return cb(null,`${file.originalname}`)
}})
const upload=multer({storage})



app.post("/img",upload.single("imgFile"),async(req,res) =>{
  console.log(req.body);
  const {Title,description}=req.body

const newBlog=  await  Blogs.create({
  imgFile:`/uploads/${req.file.filename}`,
Title,
description,
createdBy:req.user.id

})
    console.log("New Blog Created:", newBlog);

  console.log(req.file);  
 return res.redirect(`/blogs/${newBlog._id}`) 
})



// app.get('/', check('tookens'), (req, res) => {
//   // req.user is available he  re
// return  res.render("Front")
// });s

app.listen(Port, () => {
  console.log(`Example app listening on port http://localhost:${Port}`);
});
