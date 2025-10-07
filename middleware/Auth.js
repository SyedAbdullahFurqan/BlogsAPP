const {tokenss,Verify} =require("../Service/Autho.js")



 function check(cookieName = 'tookens') {
  return async(req, res, next) => {
    // read cookie
    const token = req.cookies?.[cookieName]; // same as req.cookies[cookieName]
    if (!token) {
      return res.render("Signin")
    
    }

    try {
      const payload = await Verify(token); // your jwt verify or custom verifier
      req.user =  payload;            // attach payload to request
      next();
    } catch (err) {
      console.error('Token verify error:', err.message);
if (err.name === "TokenExpiredError") {
      return res.send("invalid tokkens")
      }

    }
  };
}


   

module.exports={check}