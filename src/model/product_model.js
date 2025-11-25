const mongoose = require("mongoose");
const ObjectId=mongoose.Types.ObjectId
const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "image is required"],
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: ObjectId,
   ref:"Category"
  },
  code: {
    type: String,
  },
  cat_code: {
    type: String,
  },
  discount_price: {
    type: String,
  },
  description:{
    type:String,
  },

type:{
  type:String,
  enum:["trending","latest"],
},
 
},{
  timestamps:true
});

module.exports = mongoose.model("Product", productSchema);

