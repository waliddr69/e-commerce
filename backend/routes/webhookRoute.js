const express = require("express");
const {webhook} = require("../controllers/webhookontroller")

const router = express.Router();

router.route("/chargily").post(webhook)

module.exports = router;