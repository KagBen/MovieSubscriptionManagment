const express = require("express");
require("dotenv").config();
const expressHttpProxy = require("express-http-proxy");

const msMembersRouter = express.Router();
const MemberMs = "http://localhost:3002";

const apiProxy = expressHttpProxy(MemberMs, {
  parseReqBody: true,
  proxyReqPathResolver: (req) => {
    // Customize the path if needed
    return `/members${req.url}`;
  },
  proxyErrorHandler: (err, res, next) => {
    console.error("Proxy Error:", err);
    res.status(500).send("Proxy Error");
  },
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    // Log response data or modify it if needed
    console.log("Proxy Response Data:", proxyResData.toString("utf8"));
    return proxyResData;
  },
});

msMembersRouter.get("/", apiProxy);
msMembersRouter.get("/:memberId", apiProxy);
msMembersRouter.post("/", apiProxy);
msMembersRouter.patch("/:id", apiProxy);
msMembersRouter.delete("/:id", apiProxy);

module.exports = msMembersRouter;
