const express = require("express");
const axios = require("axios");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const msUsersRouter = express.Router();
const { createProxyMiddleware } = require("http-proxy-middleware");
const userMs = "http://localhost:3001";

msUsersRouter.post("/login", async (req, res) => {
  try {
    const userResponse = await axios.post(`${userMs}/users/login`, {
      userLoginInfo: req.body.userLoginInfo,
    });
    // Check if userResponse.data.user is defined
    if (userResponse.data.user) {
      let token;
      if (userResponse.data.user.sessionTimeOut === null) {
        token = jwt.sign(
          { user: userResponse.data.user },
          process.env.JWT_ACCESS_SECRET_TOKEN
        );

        req.session.cookie.maxAge = null;
      } else {
        // If sessionTimeOut is a valid value, set expiration to that value in minutes
        const expiresIn = `${userResponse.data.user.sessionTimeOut}m`;
        token = jwt.sign(
          { user: userResponse.data.user },
          process.env.JWT_ACCESS_SECRET_TOKEN,
          { expiresIn }
        );
        // Set the maxAge dynamically in the session cookie
        req.session.cookie.maxAge =
          userResponse.data.user.sessionTimeOut * 60 * 1000;
      }
      req.session.role = userResponse.data.user.role;
      req.session.user.permissions = userResponse.data.user.permissions;
      res.status(200).send({ user: userResponse.data.user, token });
    } else {
      // Handle the case where userResponse.data.user is not defined
      res.status(401).send({ message: "User not found", detailedError: {} });
    }
  } catch (err) {
    if (err.response && err.response.data) {
      // Send the error response if it exists
      res.status(401).send(err.response.data);
    } else {
      // Handle the case where err.response or err.response.data is undefined
      res.status(401).send({ message: "Unauthorized", detailedError: {} });
    }
  }
});

msUsersRouter.get("/logout", async (req, res) => {
  req.session.destroy();
});

const apiProxy = createProxyMiddleware({
  target: userMs,
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log("Proxy Request:", req.url);
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log("Proxy Response:", proxyRes.statusCode);
  },
  onError: (err, req, res) => {
    console.error("Proxy Error:", err);
    res.status(500).send("Proxy Error");
  },
});

msUsersRouter.get("/", apiProxy);


module.exports = msUsersRouter;

