const express = require("express");
const { getUsers,getUserById } = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id",getUserById)


// router post put delete 



module.exports = router;