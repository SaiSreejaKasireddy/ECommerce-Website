const express = require("express");
const { getUsers,getUserById,getUserByEmail,createUser,updateUser,deleteUser} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.get("/email/:email",getUserByEmail);
router.get("/:id",getUserById);
// router post put delete 

router.post("/",createUser)
router.put("/:id",updateUser);
router.delete("/:id",deleteUser);
module.exports = router;