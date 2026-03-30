const asyncHandler = require("express-async-handler");

const Profile = require("../models/profileModel");

const addProfile = asyncHandler(async (req, res) => {
  const { eventType, query, order, productId, timeSpent } = req.body;
  const profile = await Profile.create({
    userId: req.user.userId,
    eventType,
    query,
    order,
    timeSpent,
    productId,
  });
  if (profile) {
    res.status(200).json({ success: true, profile });
  } else {
    res.status(400).json({ success: false, body: "Error creating profile" });
  }
});

module.exports = {
  addProfile,
};
