const express = require("express")
const {addProduct,getProducts,deleteProduct,getLatest,getBestSeller,handleFilter,handleSearch,getProduct,getRealted} = require("../controllers/productController")
const upload = require("../middleware/uploadHandler")
const router = express.Router()

router.route("/add").post(
  upload.fields([
    { name: "img1", maxCount: 1 },
    { name: "img2", maxCount: 1 },
    { name: "img3", maxCount: 1 },
    { name: "img4", maxCount: 1 },
  ]),addProduct)

router.route("/").get(getProducts)
router.route("/latest").get(getLatest)
router.route("/bestseller").get(getBestSeller)
router.route("/search").get(handleSearch)
router.route("/filter").post(handleFilter)
router.route("/related").get(getRealted)
router.route("/:id").get(getProduct)

router.route("/delete/:id").delete(deleteProduct)

module.exports = router