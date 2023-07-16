
const product = require("../controller/productOperations")
const authenticate = require("../controller/authentication")
const express = require('express')
const router = express.Router()

router.post("/",authenticate.authenticateToken,authenticate.isAdmin,product.addProduct)
module.exports = router