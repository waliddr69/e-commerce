const express = require("express")
const {addProfile} = require("../controllers/profileController")

const router = express.Router()

router.route("/addProfile").post(require("../middleware/validateTokenHandler"),addProfile)

module.exports = router