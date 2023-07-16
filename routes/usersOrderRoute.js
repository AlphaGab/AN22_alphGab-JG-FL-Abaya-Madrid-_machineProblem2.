const express = require('express')
const router = express.Router()
const order = require("../controller/orderController")
const auth = require("../controller/authentication")
router.post("/checkout",auth.authenticateToken,auth.isNotAdmin,order.checkout)
router.get("/:userId/userDetails",auth.authenticateToken,auth.isNotAdmin,order.getUserDetails)
router.get("/orders",auth.authenticateToken,auth.isAdmin,order.getAllOrders)
router.get("/myOrders",auth.authenticateToken,auth.isNotAdmin,order.showUserOrder)
router.put("/:userId/setasAdmin",auth.authenticateToken,auth.isAdmin,order.makeAdmin)
module.exports = router

/*
{"products": [
    {
      "productId": "64b3e7eadcc8da57e2c9317f",
      "quantity": 2
    }
]
}
non-admin token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGIzODM5MDEwZjY1ZWYwNGI3NTU3NDQiLCJpYXQiOjE2ODk1MTY0ODJ9.5fkqz-D3zVDNtb9WRhPROXCWr6VQrv2AwjHMxZbivno
admin token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGIyZmU0MWUwNzNmMDM4Mzk4NDc3YjgiLCJpYXQiOjE2ODk0OTQ0MDJ9.Qb0YcqFM45M-Sd3s6uJGT6bAb0gcYzAEA4eRJXewOdc
*/