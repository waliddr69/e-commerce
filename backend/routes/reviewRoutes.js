const express = require("express");
const {createReview,getReviews} = require("../controllers/reviewController")
const router = express.Router()
router.route("/create").post(require("../middleware/validateTokenHandler"),createReview)
router.route("/").get(getReviews)
module.exports = router