const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    Name: String,
    Email: String,
    City: String,
  },
  {
    versionKey: false,
  }
);

const Member = mongoose.model("member", memberSchema, "members");

module.exports = Member;
