const mongoose=require("mongoose")
const bannerSchema=new mongoose.Schema({
     image:{
        type:String,
        required: [true,"Image is required"]
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    discountText:{
        type:String,
        required:true
    },
    caption:{
        type:String
    },

})


// pre and post 

module.exports=mongoose.model('Banner',bannerSchema)
   