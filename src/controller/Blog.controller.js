const mongoose=require("mongoose")
const Blog=require("../model/Blog.model")
const deleteImage = require("../utils/deleteimage")
const product_model = require("../model/product_model")

const createblog=async(req,res,next)=>{
    try{
        const blog=await Blog.create(req.body)
        res.status(200).json({
            success:"true",
            data:blog
        })
    }catch(err){
        if(req,body){
            deleteImage(req.body.image)
        }
        next()
    }
}

const getblog=async(req,res,next)=>{
    try{
        const blog=await Blog.find()
        res.status(200).json({
            status:"success",
            data:blog
        })
    }catch(err){
        if(req.body){
            deleteImage(req.body.image)
        }
        next()
    }
}

const updateblog=async(req,res,next)=>{
    try{
        const {id}=req.params
        const blogid=new mongoose.Types.ObjectId(id)
        const blog=await Blog.findByIdAndUpdate(blogid,req.body,{runValidators:true,new:true})
        res.status(200).send({message:"success", data:blog})
    }catch(err){
        deleteImage(req.body.image)
    }
    next(err)
}

const deleteblog=async(req,res,next)=>{
    try{
        const {id}=req.params
        const blogid=new mongoose.Types.ObjectId(id)
        await Blog.findOneAndDelete(blogid)
        res.status(200).send({message:"delete success"})
    }catch{
        next(err)
    }   
}


module.exports={getblog,updateblog,deleteblog,createblog}