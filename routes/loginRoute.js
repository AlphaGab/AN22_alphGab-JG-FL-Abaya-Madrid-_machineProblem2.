const express = require('express')
const router = express.Router()
const register = require("../controller/registerAccount")
const auth = require("../controller/authentication")
router.post("/",auth.authenticateLogin)
router.get("/auth",auth.authenticateToken)
router.post("/register",register.checkEmail,register.registerAccount)


module.exports = router
