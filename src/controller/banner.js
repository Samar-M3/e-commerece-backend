  const mongoose = require("mongoose");
const Banner = require("../model/banner.model");
const createBanner = async (req, res,next) => {
  try {
    
    const banner = await Banner.create(req.body);
    res.send(201).json({
      status: "success",
      data: banner,
    });
  } catch (err) {
    // delete image if error occur
    next(err);
  }
};

const getbanner = async (req, res,next) => {
  try {
    const banner = await Banner.find();
    res.status(200).json({
      status: "success",
      data: banner,
    });
  } catch (err) {
    if(req.file){
      deleteImage(req.body.image)
    }
    next(err);
  }
};

const delteBanner=async(req,res,next)=>{
  try{

    const{id}=req.params
   
    let bannerId= await new mongoose.Types.ObjectId(id)

    await Banner.findByIdAndDelete(bannerId)

    res.status(200).send({message:"Delete Success"})
  }
  catch{
     console.log('this is error')
    next(err)
  }
}

const updatebanner=async(req,res,next)=>{
  try{
    const {id}=req.params
    let bannerId=new mongoose.Types.ObjectId(id)
    const banner=await Banner.findByIdAndUpdate(bannerId,req.body,{new:true, runValidators:true})
    res.status(200).json({
      status:"success",
      data:banner
    })
  }catch(err){
    if(req.file){
      deleteImage(req.body.image )
    }
    next(err)
  }
}

module.exports = { createBanner, getbanner, delteBanner,updatebanner };
