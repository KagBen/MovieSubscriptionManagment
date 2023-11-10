const express = require("express");
require("dotenv").config();

const msMembersRouter = express.Router();
const MemberMs = "http://localhost:3002";

// Use the proxy middleware for all routes under /members
//msMembersRouter.use("/", apiProxy);

module.exports = msMembersRouter;
