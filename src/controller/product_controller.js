const mongoose = require("mongoose");
const Product = require("../model/product_model");
const deleteImage = require("../utils/deleteimage");

const createProcduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({
      success: "true",
      data: product,
    });
  } catch (err) {
    if (req.file) {
      deleteImage(req.body.image);
    }
    next(err);
  }
};

const getProduct=async(req,res,next)=>{
    try{
        const product=await Product.find().populate("category")
        res.status(200).json({
            status:"success",
            data:product
        })
    }catch(err){
        if(req.file){
            deleteImage(req.body.image)
        }
        next(err)
    }
}

const getTrendingProduct = async (req, res, next) => {
  try {
    const product = await Product.find({type:"trending"});
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    if (req.file) {
      deleteImage(req.body.image);
    }
    next(err);
  }
};

const getLatestProduct=async(req,res,next)=>{
    try{
        const product=await Product.find({type:"latest"})
        res.status(200).json({
            status:"success",
            data:product
        })
    }catch(err){
        if(req.file){
            deleteImage(req.body.image)
        }
        next(err)
    }
}
const getSingleProduct=async(req,res,next)=>{
  try{
const {id}=req.params
const productId=new mongoose.Types.ObjectId(id)
    const data=await Product.findOne(productId)
    res.status(200).send(data)
  }catch(err){
    next(err)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productId = new mongoose.Types.ObjectId(id);
    await Product.findByIdAndDelete(productId);
    res.status(200).send({ message: "delete success" });
  } catch (err) {
    console.log("this is error");
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productId = new mongoose.Types.ObjectId(id);
    console.log(productId);

    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).send({ message: "success", data: product });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createProcduct,getProduct, getTrendingProduct,getLatestProduct,
  getSingleProduct, deleteProduct, updateProduct };
