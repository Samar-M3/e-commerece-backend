const express=require("express")

const router=express.Router()
router.route("/").get((req,res)=>{
    res.send("user route is working")
}).post((req,res)=>{
    res.send("user post oute is working")
})
    
router.route("./id").get((req,res)=>{
    res.send(`user id is ${req.params.id} and updated`)
}).patch((req,res)=>{
    res.send(`user id is ${req.params.id} and updated`)
})

.delete((req,res)=>{
    res.send(`user id is ${req.params.id} and updated`)
})


module.exports=router