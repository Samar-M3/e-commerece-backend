const checkfile=(req,res,next)=>{
    if(req.file){
        req.body.image = req.file.path.replace(/\\/g, "/");
        next()
    }
    else{
        res.status(400).json({
            message:"image file is not found"
        })
    }
}

module.exports=checkfile