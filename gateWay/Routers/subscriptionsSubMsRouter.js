const express = require("express");
require("dotenv").config();
const expressHttpProxy = require("express-http-proxy");
const permissions = require("../middlewears/permissionValidate");

const msSubsctiptionRouter = express.Router();
const SubsctiptionMs = "http://localhost:3002";
/**
 * @openapi
 * tags:
 *   name: Subsctription
 *   description: API for managing subscriptions - microservice 2
 */
const apiProxy = expressHttpProxy(SubsctiptionMs, {
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

msSubsctiptionRouter.get("/", permissions("View Subscriptions"), apiProxy);
msSubsctiptionRouter.get(
  "/member/:id",
  permissions("View Subscriptions"),
  apiProxy
);
msSubsctiptionRouter.post("/", permissions("Create Subscriptions"), apiProxy);
msSubsctiptionRouter.patch("/updateMovie/:id/:status", apiProxy);
msSubsctiptionRouter.patch("/:id", apiProxy);
msSubsctiptionRouter.delete(
  "/:id",
  permissions("Delete Subscriptions"),
  apiProxy
);

module.exports = msSubsctiptionRouter;
