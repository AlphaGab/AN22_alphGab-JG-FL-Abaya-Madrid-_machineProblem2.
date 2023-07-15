const express = require('express')
const router = express.Router()
const register = require("../controller/registerAccount")
router.get("/",(req,res)=>{
    res.send("Login");
})
router.post("/register",register.checkEmail,register.registerAccount)

module.exports = router
