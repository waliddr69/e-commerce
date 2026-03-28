const mongo = require("mongoose");

const profileSchema = mongo.Schema(
  {
    userId: {
      type: mongo.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    eventType: String,

    productId: {
      type: mongo.Schema.Types.ObjectId,
      ref: "Product",
    },

    query: {
      type: String,
    },
    timeSpent:Number,
  },
  {
    timestamps: true,
  },
);

module.exports = mongo.model("Profile", profileSchema);
