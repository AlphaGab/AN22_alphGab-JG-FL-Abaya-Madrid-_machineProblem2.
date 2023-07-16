
const product = require("../controller/productOperations")
const authenticate = require("../controller/authentication")
const express = require('express')
const router = express.Router()

router.get("/:productId",product.showSingleProduct)
router.put("/:productId",authenticate.authenticateToken,authenticate.isAdmin,product.updateProduct)
router.put("/:productId/archive",authenticate.authenticateToken,authenticate.isAdmin,product.toArchive)
router.get("/",product.showAllActiveProducts)
router.post("/",authenticate.authenticateToken,authenticate.isAdmin,product.addProduct)
module.exports = router