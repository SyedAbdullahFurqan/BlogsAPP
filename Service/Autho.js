const jwt= require("jsonwebtoken")

const securte="saad213223"
 async function tokenss(e) {
      
 
try {
  return  jwt.sign({
name:e.NAMES,
  id:e._id,
  emails:e.emails
},
securte,
{expiresIn:"10 days"}
)
} catch (error) {
  console.log(error+"error")
}
  }

 async function Verify(cook) {
  return await jwt.verify(cook,securte)
}
  module.exports={tokenss,Verify}