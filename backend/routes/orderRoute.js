const express = require("express")
const {addOrder,getOrder,getOrders,modifyOrder} = require("../controllers/orderController")
const router = express.Router()

router.route("/add").post(addOrder)
router.route("/").get(getOrder)
router.route("/getAll").get(getOrders)
router.route("/put").patch(modifyOrder)

module.exports = router