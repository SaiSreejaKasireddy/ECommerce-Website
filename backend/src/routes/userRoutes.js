const express = require("express");
const { getUsers,getUserById,getUserByEmail,createUser} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.get("/email/:email",getUserByEmail);
router.get("/:id",getUserById);
// router post put delete 

router.post("/",createUser)

module.exports = router;