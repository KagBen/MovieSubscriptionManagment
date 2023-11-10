const express = require("express");
require("dotenv").config();

const msMembersRouter = express.Router();
const MemberMs = "http://localhost:3002";

const apiProxy = expressHttpProxy(MemberMs, {
  parseReqBody: true,
  proxyReqPathResolver: (req) => {
    // Customize the path if needed
    return `/users${req.url}`;
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

msUsersRouter.get("/", apiProxy);
msUsersRouter.patch("/register", apiProxy);
msUsersRouter.delete("/:userId", apiProxy);
msUsersRouter.patch("/:userId", apiProxy);
msUsersRouter.post("/addUser", apiProxy);

module.exports = msMembersRouter;
