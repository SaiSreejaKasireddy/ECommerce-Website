const express=require("express");
const {getCategories,createCategory,updateCategory}=require("../controllers/categoryController");
const router=express.Router();
router.get("/",getCategories);
router.post("/",createCategory);
router.put("/:id",updateCategory);
module.exports=router;