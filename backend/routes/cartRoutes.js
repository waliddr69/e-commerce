const express = require("express")

const router = express.Router();
const {getCart,addCart,modifyQuantity,removeCart} = require("../controllers/cartController")

router.route("/").get(getCart)
router.route("/add").post(addCart)
router.route("/modify").patch(modifyQuantity)
router.route("/delete").delete(removeCart)

module.exports = router