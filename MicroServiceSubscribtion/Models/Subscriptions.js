const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    MemberId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    Movies: [{ MovieId: mongoose.Schema.Types.ObjectId, Date: Date }],
  },
  {
    versionKey: false,
  }
);

const Subscription = mongoose.model(
  "subscription",
  subscriptionSchema,
  "subscriptions"
);

module.exports = Subscription;
