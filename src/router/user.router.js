const express = require("express");
const { login, signup } = require("../controller/user.controller");
const { isauthenticated } = require("../middleware/auth");

const router = express.Router();
router
  .route("/")
  .get((req, res) => {
    res.send("user route is working");
  })
  .post((req, res) => {
    res.send("user post route is working");
  });

router
  .route("./id")
  .get((req, res) => {
    res.send(`user id is ${req.params.id} and updated`);
  })
  .patch((req, res) => {
    res.send(`user id is ${req.params.id} and updated`);
  })

  .delete((req, res) => {
    res.send(`user id is ${req.params.id} and updated`);
  });

  router.post("/login",login)
  router.post("/signup",signup)
  router.patch("/user/:id",isauthenticated,()=>{
    console.log('update');
    
  })

module.exports = router;
