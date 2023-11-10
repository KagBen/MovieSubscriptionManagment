const express = require("express");
require("dotenv").config();
const expressHttpProxy = require("express-http-proxy");
const permissions = require("../middlewears/permissionValidate");

const msMoviesRouter = express.Router();
const MovieMs = "http://localhost:3002";
/**
 * @openapi
 * tags:
 *   name: Movies
 *   description: API for managing movies - microservice 2
 */
/**
 * @openapi
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         Name:
 *           type: string
 *           description: The name of the movie. (Required)
 *         Genres:
 *           type: array
 *           items:
 *             type: string
 *           description: The genres of the movie. (Optional)
 *         Image:
 *           type: string
 *           description: The image URL of the movie. (Optional)
 *         Premiered:
 *           type: string
 *           description: The premiere date of the movie. (Optional)
 *       example:
 *         Name: "The Shawshank Redemption"
 *         Genres: ["Drama", "Crime"]
 *         Image: "https://example.com/shawshank.jpg"
 *         Premiered: "1994-09-10"
 */

const apiProxy = expressHttpProxy(MovieMs, {
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

msMoviesRouter.get("/", permissions("View Movies"), apiProxy);
msMoviesRouter.get("/MovieSubscribers", permissions("View Movies"), apiProxy);
msMoviesRouter.get(
  "/MovieSubscribers/:movieId",
  permissions("View Movies"),apiProxy);
msMoviesRouter.get("/:id", permissions("View Movies"), apiProxy);
msMoviesRouter.post("/", permissions("Create Movies"), apiProxy);
msMoviesRouter.patch("/:id", apiProxy);
msMoviesRouter.delete("/:id", permissions("Delete Movies"), apiProxy);

module.exports = msMoviesRouter;
