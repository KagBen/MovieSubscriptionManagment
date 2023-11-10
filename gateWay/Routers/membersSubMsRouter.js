const express = require("express");
require("dotenv").config();
const expressHttpProxy = require("express-http-proxy");

const msMembersRouter = express.Router();
const MemberMs = "http://localhost:3002";
/**
 * @openapi
 * tags:
 *   name: Members
 *   description: API for managing members - microservice 2
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         Name:
 *           type: string
 *           description: The name of the member.
 *         Email:
 *           type: string
 *           format: email
 *           description: The email address of the member.
 *         City:
 *           type: string
 *           description: The city where the member is located.
 *       example:
 *         Name: "John Doe"
 *         Email: "john.doe@example.com"
 *         City: "New York"
 */

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
/**
 * @openapi
 * /members:
 *   get:
 *     summary: Get all members
 *     description: Retrieve a list of all members.
 *     tags:
 *       - Members
 *     security:
 *       - JWTAuth: []  # Requires JWT authentication
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "Successfully get All Members"
 *               members:
 *                 - _id: "654e31fdb1af8626ea28995d"
 *                   Name: "Leanne Graham"
 *                   Email: "Sincere@april.biz"
 *                   City: "Gwenborough"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
msMembersRouter.get("/", apiProxy);
/**
 * @openapi
 * /members/{memberId}:
 *   get:
 *     summary: Get a member by ID
 *     description: Retrieve a member by their unique ID.
 *     tags:
 *       - Members
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         description: The ID of the member to retrieve.
 *         schema:
 *           type: string
 *     security:
 *       - JWTAuth: []  # Requires JWT authentication
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "Successfully get Member By id"
 *               member:
 *                 _id: "654e31fdb1af8626ea28996b"
 *                 Name: "Nicholas Runolfsdottir V"
 *                 Email: "Sherwood@rosamond.me"
 *                 City: "Aliyaview"
 *       '404':
 *         description: Member not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Member not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
msMembersRouter.get("/:memberId", apiProxy);
/**
 * @openapi
 * /members:
 *   post:
 *     summary: Create a new member
 *     description: Create a new member with the provided details.
 *     tags:
 *       - Members
 *     security:
 *       - JWTAuth: []  # Requires JWT authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberObj:
 *                 type: object
 *                 properties:
 *                   Name:
 *                     type: string
 *                     description: The name of the member.
 *                   Email:
 *                     type: string
 *                     format: email
 *                     description: The email address of the member.
 *                   City:
 *                     type: string
 *                     description: The city where the member is located.
 *             example:
 *               memberObj:
 *                 Name: "John Doe"
 *                 Email: "john.doe@example.com"
 *                 City: "New York"
 *     responses:
 *       '201':
 *         description: Member created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Successfully created member"
 *               member:
 *                 _id: "654e31fdb1af8626ea28996c"
 *                 Name: "John Doe"
 *                 Email: "john.doe@example.com"
 *                 City: "New York"
 *       '401':
 *         description: Unauthorized, missing or invalid JWT token
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       '400':
 *         description: Bad Request, invalid input
 *         content:
 *           application/json:
 *             example:
 *               error: "Bad Request"
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
msMembersRouter.post("/", apiProxy);
/**
 * @openapi
 * /members/{id}:
 *   patch:
 *     summary: Update a member by ID
 *     description: Update a member by their unique ID. Supports partial updates.
 *     tags:
 *       - Members
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the member to update.
 *         schema:
 *           type: string
 *     security:
 *       - JWTAuth: []  # Requires JWT authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberObj:
 *                 type: object
 *                 properties:
 *                   Name:
 *                     type: string
 *                     description: The name of the member. (Optional)
 *                   Email:
 *                     type: string
 *                     format: email
 *                     description: The email address of the member. (Optional)
 *                   City:
 *                     type: string
 *                     description: The city where the member is located. (Optional)
 *             example:
 *               memberObj:
 *                 Name: "John Doe"
 *     responses:
 *       '200':
 *         description: Member updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Successfully updated member"
 *               member:
 *                 _id: "654e31fdb1af8626ea28996c"
 *                 Name: "John Doe"
 *                 Email: "john.doe@example.com"
 *                 City: "New York"
 *       '401':
 *         description: Unauthorized, missing or invalid JWT token
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       '404':
 *         description: Member not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Member not found"
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
msMembersRouter.patch("/:id", apiProxy);
/**
 * @openapi
 * /members/{id}:
 *   delete:
 *     summary: Delete a member by ID
 *     description: Delete a member by their unique ID.
 *     tags:
 *       - Members
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the member to delete.
 *         schema:
 *           type: string
 *     security:
 *       - JWTAuth: []  # Requires JWT authentication
 *     responses:
 *       '200':
 *         description: Member deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Successfully deleted member"
 *               memberId: "654e31fdb1af8626ea28996c"
 *       '401':
 *         description: Unauthorized, missing or invalid JWT token
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       '404':
 *         description: Member not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Member not found"
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
msMembersRouter.delete("/:id", apiProxy);

module.exports = msMembersRouter;
