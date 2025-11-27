const jwt = require("jsonwebtoken");
const isauthenticated = (req, res, next) => {
  console.log(req.headers.authorization);

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      if (token && user) {
        req.user = user;
        next();
      } else {
        res.status(401).send("authentication failed");
      }
    } else {
      res.status(401).send("authentication failed");
    }
    console.log(user);
  } catch (err) {
    if (err) {
      res.status(401).message("authentication failed");
    }
  }
};
const Isadmin=(req,res,next)=>{
    const user=req.user
    if(user.role==="superadmin"){
        next()
    }else{
        res.status(403).send({message:"forbidden"})
    }
}

const Isbuyer=(req,res,next)=>{
     const user=req.user
    if(user.role==="buyer"){
        next()
    }else{
        res.status(403).send({message:"forbidden"})
    }
}

const IsSeller=(req,res,next)=>{
     const user=req.user
    if(user.role==="seller"){
        next()
    }else{
        res.status(403).send({message:"forbidden"})
    }
}

module.exports = {
  isauthenticated,
  Isadmin,
  Isbuyer,
  IsSeller
};
