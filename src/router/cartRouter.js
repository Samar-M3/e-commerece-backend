const express = require("express");
const { getCategory, createCategory } = require("../controller/category.controller");
const { getCart, getAllCartItem } = require("../controller/cart.controller");
const { isauthenticated, Isbuyer } = require("../middleware/auth");
const router = express.Router();

// router.get("/",isLogedin,isAdmin,getAllCartItem );
router.post("/",isauthenticated,Isbuyer, createCategory);
router.get("/mycart",isauthenticated,Isbuyer, getCart);

module.exports = router;
