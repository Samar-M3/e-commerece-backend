const User =require("../model/user.model")
const bcrypt=require("bcrypt")
const Joi = require("joi")
const joi=require("joi")
const jwt =require("jsonwebtoken")

const signupSchema=joi.object({
    username:Joi.string().alphanum().min(3).max(30).required()
    .messages({
         "string.base": "Username must be a text value",
      "string.alphanum": "Username must only contain letters and numbers",
      "string.empty": "Username is required",
      "string.min": "Username must be at least 3 characters",
      "string.max": "Username cannot be more than 30 characters",
    }),

     email: Joi.string().email({ tlds: { allow: false } }).required()
    .messages({
      "string.email": "Enter a valid email address",
      "string.empty": "Email is required",
    }),

  password: Joi.string().min(6).required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "string.empty": "Password is required",
    }),

  role: Joi.string().valid("user", "admin").default("user")
    .messages({
      "any.only": "Role must be either 'user' or 'admin'",
    }),
})

const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Enter a valid email address",
      "string.empty": "Email is required",
    }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

const login =async(req,res)=>{
    try{
        const logindata=req.body
        const {error,value}=loginSchema.validate(logindata)
        if(!error){
            const user=await User.findOne({email:value.email})
            if(user){
                const correctPass=await bcrypt.compare(
                  value.password,
                  user.password
                )
                if(correctPass){  
                  const data=user.toObject()
                  delete data.password
                  const token =await jwt.sign(data,process.env.JWT_SECRET)
                  res.status(200).send({message:"user login successfull",token:token,
                  user:user
                  })
                }else{
                  res.status(401).send("wrong credentials")
                }
            }else{
              res.status(402).send("wrong credemtials")
            }
        }else{
          throw new Error(error)
        }
    }catch(err){
      console.log(err);
    }
}

const signup=async(req,res)=>{
  const data=req.body
  try{
    const {error,value}=signupSchema.validate(data,{
      allowUnknown:true,
      abortEarly:true
    })
    if(!error){
      saltrounds=10
      const hash=bcrypt.hashSync(value.password,saltrounds)
      const user=await User.create({...value,password:hash})
      const userObject=user.toObject()
      delete userObject.password
      const token=jwt.sign(userObject,process.env.JWT_SECRET)
      res.status(200).send({
        status:"success",
        message:"user logged in successfully",
        data:{
          token,userObject
        }
      })
    }else{
      throw error
    }
    res.status(200).send("user created succesfully")
    }catch(err){
      console.log(err)
      res.send(err)
  }
}


module.exports={
  signup,login
}
