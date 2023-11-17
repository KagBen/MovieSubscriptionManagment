const express = require("express");
require("dotenv").config();
const expressHttpProxy = require("express-http-proxy");
const permissions = require("../middlewears/permissionValidate");

const msSubsctiptionRouter = express.Router();
const SubsctiptionMs = "http://localhost:3002";
/**
 * @openapi
 * tags:
 *   name: Subscriptions
 *   description: API for managing subscriptions - microservice 2
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         MemberId:
 *           type: string
 *           format: uuid
 *           description: The ID of the member associated with the subscription.
 *         Movies:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               MovieId:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the movie in the subscription.
 *               Date:
 *                 type: string
 *                 format: date-time
 *                 description: The date when the movie was added to the subscription.
 *       example:
 *         MemberId: "654e44b3eb7e4354d4799609"
 *         Movies:
 *           - MovieId: "654e44b3eb7e4354d4799429"
 *             Date: "2023-05-22T00:00:00.000Z"
 */
const apiProxy = expressHttpProxy(SubsctiptionMs, {
  parseReqBody: true,
  proxyReqPathResolver: (req) => {
    // Customize the path if needed
    return `/subscriptions${req.url}`;
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
/**
 * @openapi
 * /subscriptions:
 *   get:
 *     summary: Get all subscriptions
 *     description: Retrieve information about all subscriptions. Requires permission to view subscriptions and a valid JWT token.
 *     tags:
 *       - Subscriptions
 *     security:
 *       - JWTAuth: []  # Requires JWT authentication
 *       - PermissionViewSubscriptions: []  # Requires permission to view subscriptions
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "Successfully get all Subscriptions"
 *               allSubscriptions:
 *                 - subscriptionId: "654e4ceab5ccab9e049e2c32"
 *                   memberInfo:
 *                     id: "654e4c7eb5ccab9e049e2c1c"
 *                     name: "Leanne Graham"
 *                     email: "Sincere@april.biz"
 *                     city: "Gwenborough"
 *                   movies:
 *                     - movieInfo:
 *                         id: "654e4c7db5ccab9e049e2a3e"
 *                         name: "Person of Interest"
 *                         imgUrl: "https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg"
 *                       date: "2023-05-21T00:00:00.000Z"
 *       '401':
 *         description: Unauthorized, missing or invalid JWT token or insufficient permissions
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *     securitySchemes:
 *       JWTAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *       PermissionViewSubscriptions:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 *         description: Provide a valid permission token to view subscriptions
 */

msSubsctiptionRouter.get("/", apiProxy);
/**
 * @openapi
 * /subscriptions/member/{id}:
 *   get:
 *     summary: Get subscriptions by member ID
 *     description: Get subscriptions by the ID of the member. Requires permission to view subscriptions and a valid JWT token.
 *     tags:
 *       - Subscriptions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the member to get subscriptions for.
 *         schema:
 *           type: string
 *     security:
 *       - JWTAuth: []  # Requires JWT authentication
 *       - PermissionViewSubscriptions: []  # Requires permission to view subscriptions
 *     responses:
 *       '200':
 *         description: Subscriptions retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Successfully retrieved subscriptions"
 *               subscrip:
 *                 subscriptionId: "654e579d933cbacc96c44715"
 *                 memberInfo:
 *                   id: "654e5743933cbacc96c446ff"
 *                   name: "Leanne Graham"
 *                   email: "Sincere@april.biz"
 *                   city: "Gwenborough"
 *                 movies:
 *                   - movieInfo:
 *                       id: "654e5743933cbacc96c4451f"
 *                       name: "Under the Dome"
 *                       imgUrl: "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"
 *                     date: "2023-05-22T00:00:00.000Z"
 *       '401':
 *         description: Unauthorized, missing or invalid JWT token or insufficient permissions
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       '404':
 *         description: Subscriptions not found for the member
 *         content:
 *           application/json:
 *             example:
 *               error: "Subscriptions not found for the member"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *     securitySchemes:
 *       JWTAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *       PermissionViewSubscriptions:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 *         description: Provide a valid permission token to view subscriptions
 */

msSubsctiptionRouter.get("/member/:id", apiProxy);
/**
 * @openapi
 * /subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     description: Create a new subscription with the provided details. Requires permission to create subscriptions and a valid JWT token.
 *     tags:
 *       - Subscriptions
 *     security:
 *       - JWTAuth: []  # Requires JWT authentication
 *       - PermissionCreateSubscriptions: []  # Requires permission to create subscriptions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subscriptionObj:
 *                 type: object
 *                 properties:
 *                   MemberId:
 *                     type: string
 *                     format: uuid
 *                     description: The ID of the member for the new subscription.
 *                   Movies:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         MovieId:
 *                           type: string
 *                           format: uuid
 *                           description: The ID of the movie to add to the subscription.
 *                         Date:
 *                           type: string
 *                           format: date
 *                           description: The date when the movie was added to the subscription.
 *             example:
 *               subscriptionObj:
 *                 MemberId: "654e4c7eb5ccab9e049e2c1e"
 *                 Movies:
 *                   - MovieId: "654e4c7db5ccab9e049e2a3e"
 *                     Date: "2023-05-21"
 *     responses:
 *       '201':
 *         description: Subscription created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Successfully created subscription"
 *               subscription:
 *                 subscriptionId: "654e4ceab5ccab9e049e2c32"
 *                 memberInfo:
 *                   id: "654e4c7eb5ccab9e049e2c1e"
 *                   name: "Member Name"
 *                   email: "member@example.com"
 *                   city: "Member City"
 *                 movies:
 *                   - movieInfo:
 *                       id: "654e4c7db5ccab9e049e2a3e"
 *                       name: "Movie Name"
 *                       imgUrl: "https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg"
 *                     date: "2023-05-21T00:00:00.000Z"
 *       '401':
 *         description: Unauthorized, missing or invalid JWT token or insufficient permissions
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *     securitySchemes:
 *       JWTAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *       PermissionCreateSubscriptions:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 *         description: Provide a valid permission token to create subscriptions
 */
msSubsctiptionRouter.post("/", permissions("Create Subscriptions"), apiProxy);
/**
 * @openapi
 * /subscriptions/updateMovie/{id}/{status}:
 *   patch:
 *     summary: Update movies in a subscription
 *     description: Update movies in a subscription by adding or cancelling. Requires a valid JWT token.
 *     tags:
 *       - Subscriptions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subscription to update.
 *         schema:
 *           type: string
 *       - in: path
 *         name: status
 *         required: true
 *         description: The status of the update (add or cancel).
 *         schema:
 *           type: string
 *           enum: [add, cancel]
 *     security:
 *       - JWTAuth: []  # Requires JWT authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               MovieObj:
 *                 type: object
 *                 properties:
 *                   MovieId:
 *                     type: string
 *                     format: uuid
 *                     description: The ID of the movie to add or cancel.
 *                   Date:
 *                     type: string
 *                     format: date-time
 *                     description: The date when the movie was added to or cancelled from the subscription.
 *             example:
 *               MovieObj:
 *                 MovieId: "654e4c7db5ccab9e049e2a3e"
 *                 Date: "2023-05-21T00:00:00.000Z"
 *     responses:
 *       '200':
 *         description: Subscription updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Successfully updated subscription"
 *               subscriptionId: "654e4ceab5ccab9e049e2c32"
 *               memberInfo:
 *                 id: "654e4c7eb5ccab9e049e2c1e"
 *                 name: "Member Name"
 *                 email: "member@example.com"
 *                 city: "Member City"
 *               movies:
 *                 - movieInfo:
 *                     id: "654e4c7db5ccab9e049e2a3e"
 *                     name: "Movie Name"
 *                     imgUrl: "https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg"
 *                   date: "2023-05-21T00:00:00.000Z"
 *       '401':
 *         description: Unauthorized, missing or invalid JWT token
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       '404':
 *         description: Subscription not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Subscription not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *     securitySchemes:
 *       JWTAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 */
msSubsctiptionRouter.patch("/updateMovie/:id/:status", permissions("Update Subscriptions"), apiProxy);

// msSubsctiptionRouter.patch("/:id", apiProxy);
/**
 * @openapi
 * /subscriptions/{id}:
 *   delete:
 *     summary: Delete a subscription by ID
 *     description: Delete a subscription by its ID. Requires permission to delete subscriptions and a valid JWT token.
 *     tags:
 *       - Subscriptions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subscription to delete.
 *         schema:
 *           type: string
 *     security:
 *       - JWTAuth: []  # Requires JWT authentication
 *       - PermissionDeleteSubscriptions: []  # Requires permission to delete subscriptions
 *     responses:
 *       '200':
 *         description: Subscription deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Successfully deleted subscription"
 *               subscriptionId: "654e4ceab5ccab9e049e2c32"
 *       '401':
 *         description: Unauthorized, missing or invalid JWT token or insufficient permissions
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       '404':
 *         description: Subscription not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Subscription not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *     securitySchemes:
 *       JWTAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *       PermissionDeleteSubscriptions:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 *         description: Provide a valid permission token to delete subscriptions
 */
msSubsctiptionRouter.delete(
  "/:id",
  permissions("Delete Subscriptions"),
  apiProxy
);

module.exports = msSubsctiptionRouter;
