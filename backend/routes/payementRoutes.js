const express = require("express")
const {createPay} = require("../controllers/payementController")
const router = express.Router()


router.route("/create").post(createPay)

module.exports = router