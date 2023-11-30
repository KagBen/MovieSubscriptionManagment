const express = require("express");
const axios = require("axios");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const msUsersRouter = express.Router();
const expressHttpProxy = require("express-http-proxy");
const userMs = "http://localhost:3001";
const isAdmin = require("../middlewears/isAdmin");
/**
 * @openapi
 * tags:
 *   name: Users
 *   description: API for managing users - microservice 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         username:
 *           type: string
 *           uniqueItems: true
 *           description: The user's username.
 *         password:
 *           type: string
 *           description: The user's password.
 *         role:
 *           type: string
 *           description: The user's role.
 *         sessionTimeOut:
 *           type: number
 *           description: Session timeout in minutes.
 *         createdDate:
 *           type: string
 *           format: date-time
 *           description: The user's creation date.
 *         userInfo:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *           description: User information.
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user permissions.
 *       required:
 *         - username
 *         - password
 *         - role
 *         - createdDate
 *       example:
 *         _id: "123456789"
 *         username: "john_doe"
 *         password: "hashed_password"
 *         role: "admin"
 *         sessionTimeOut: 30
 *         createdDate: "2023-01-01T12:00:00Z"
 *         userInfo:
 *           firstName: "John"
 *           lastName: "Doe"
 *         permissions:
 *           - "read"
 *           - "write"
 */

/**
 * @swagger
 * paths:
 *   /users/login:
 *     post:
 *       summary: Authenticate user and generate an access token
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userLoginInfo:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     password:
 *                       type: string
 *                   required:
 *                     - username
 *                     - password
 *       responses:
 *         '200':
 *           description: Successfully authenticated user
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   user:
 *                     $ref: '#/components/schemas/User'  # Reference to your User schema
 *                   token:
 *                     type: string
 *           headers:
 *             Set-Cookie:
 *               description: Session cookie for maintaining user state
 *               schema:
 *                 type: string
 *         '401':
 *           description: Unauthorized - User not found or invalid credentials
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   detailedError:
 *                     type: object
 *         '500':
 *           description: Internal Server Error - Unexpected error during authentication
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */
msUsersRouter.post("/login", async (req, res) => {
  try {
    const userResponse = await axios.post(`${userMs}/users/login`, {
      userLoginInfo: req.body.userLoginInfo,
    });
    // Check if userResponse.data.user is defined
    if (userResponse.data.user) {
      console.log(userResponse.data.user);
      let token;
      if (userResponse.data.user.sessionTimeOut === null) {
        token = jwt.sign(
          { user: userResponse.data.user },
          process.env.JWT_ACCESS_SECRET_TOKEN
        );
        req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
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
      req.session.permissions = userResponse.data.user.permissions;
      console.log("from login : ");
      console.log(req.session);
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
      res.status(401).send({ message: err.message });
    }
  }
});

/**
 * @swagger
 * paths:
 *   /users/logout:
 *     get:
 *       summary: Log out the user and destroy the session
 *       tags: [Users]
 *       responses:
 *         '200':
 *           description: Successfully logged out
 *           content:
 *             application/json:
 *               example:
 *                 message: "Logout successful"
 *         '500':
 *           description: Internal Server Error - Unexpected error during logout
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error"
 */
msUsersRouter.get("/logout", async (req, res) => {
  try {
    console.log("from logged out" );
    console.log(req.session);
    req.session.destroy();
    res.status(200).send("logout successful");
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

const apiProxy = expressHttpProxy(userMs, {
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
/**
 * @swagger
 * paths:
 *   /users:
 *     get:
 *       summary: Get all users (admin access only)
 *       tags: [Users]
 *       security:
 *         - isAdmin: []
 *       responses:
 *         '200':
 *           description: Successfully retrieved all users
 *           content:
 *             application/json:
 *               example:
 *                 message: "Successfully get All Users"
 *                 users:
 *                   - userInfo:
 *                       firstName: "admin"
 *                       lastName: "premium"
 *                     _id: "654e31f09fc4f14c1c06ff2a"
 *                     username: "Admin1"
 *                     role: "admin"
 *                     sessionTimeOut: null
 *                     createdDate: "2023-11-10T13:36:48.041Z"
 *                     permissions:
 *                       - "Update Subscriptions"
 *                       - "Create Subscriptions"
 *                       - "Delete Subscriptions"
 *                       - "Update Movies"
 *                       - "Create Movies"
 *                       - "Delete Movies"
 *         '401':
 *           description: Unauthorized - User is not an admin
 *           content:
 *             application/json:
 *               example:
 *                 message: "Unauthorized - Admin access only"
 */
/**
 * @swagger
 * securitySchemes:
 *   isAdmin:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 *     description: Enter 'Bearer <token>' where <token> is the admin user's token.
 */
msUsersRouter.get("/", isAdmin, apiProxy);
/**
 * @swagger
 * paths:
 *   /users/register:
 *     patch:
 *       summary: Update user password during registration
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userRegisterInfo:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     password:
 *                       type: string
 *                   required:
 *                     - username
 *                     - password
 *       responses:
 *         '200':
 *           description: Successfully updated user password during registration
 *           content:
 *             application/json:
 *               example:
 *                 message: "Password updated during registration"
 *         '401':
 *           description: Unauthorized - User not allowed to register or update password
 *           content:
 *             application/json:
 *               example:
 *                 message: "Unauthorized - Registration not allowed"
 *         '500':
 *           description: Internal Server Error - Unexpected error during registration
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error"
 */
msUsersRouter.patch("/register", apiProxy);
/**
 * @swagger
 * paths:
 *   /users/{userId}:
 *     delete:
 *       summary: Delete a user by user ID (admin access only)
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the user to be deleted.
 *       security:
 *         - isAdmin: []
 *       responses:
 *         '200':
 *           description: Successfully deleted the user
 *           content:
 *             application/json:
 *               example:
 *                 message: "Successfully deleted the user"
 *                 userId: "654e44b3eb7e4354d4799429"
 *         '401':
 *           description: Unauthorized - User is not an admin
 *           content:
 *             application/json:
 *               example:
 *                 message: "Unauthorized - Admin access only"
 *         '404':
 *           description: Not Found - User with the specified ID not found
 *           content:
 *             application/json:
 *               example:
 *                 message: "User not found"
 *         '500':
 *           description: Internal Server Error - Unexpected error during user deletion
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error"
 */
msUsersRouter.delete("/:userId", isAdmin, apiProxy);
/**
 * @swagger
 * paths:
 *   /users/{userId}:
 *     patch:
 *       summary: Update user information by user ID (admin access only)
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the user to be updated.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userUpdateFields:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       description: The updated username
 *                     password:
 *                       type: string
 *                       description: The updated password
 *                     role:
 *                       type: string
 *                       description: The updated role
 *                     sessionTimeOut:
 *                       type: number
 *                       description: The updated session timeout in minutes
 *                     userInfo:
 *                       type: object
 *                       properties:
 *                         firstName:
 *                           type: string
 *                         lastName:
 *                           type: string
 *                       description: Updated user information
 *                     permissions:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Updated array of user permissions
 *                   required:
 *                     - username
 *                     - role
 *                     - sessionTimeOut
 *                     - userInfo
 *                     - permissions
 *               example:
 *                 userUpdateFields:
 *                   username: "john_doe"
 *                   password: "new_hashed_password"
 *                   role: "user"
 *                   sessionTimeOut: 60
 *                   userInfo:
 *                     firstName: "John"
 *                     lastName: "UpdatedLastName"
 *                   permissions:
 *                       - "Update Subscriptions"
 *                       - "Create Subscriptions"
 *                       - "Delete Subscriptions"
 *                       - "Update Movies"
 *                       - "Create Movies"
 *                       - "Delete Movies"
 *       security:
 *         - isAdmin: []
 *       responses:
 *         '200':
 *           description: Successfully updated user information
 *           content:
 *             application/json:
 *               example:
 *                 message: "Successfully added a new user"
 *                 user:
 *                   _id: "generated_user_id"
 *                   username: "new_user"
 *                   role: "user"
 *                   sessionTimeOut: 30
 *                   createdDate: "2023-01-01T12:00:00Z"
 *                   userInfo:
 *                     firstName: "New"
 *                     lastName: "User"
 *                   permissions:
 *                       - "Update Subscriptions"
 *                       - "Create Subscriptions"
 *                       - "Delete Subscriptions"
 *                       - "Update Movies"
 *                       - "Create Movies"
 *                       - "Delete Movies"
 *         '401':
 *           description: Unauthorized - User is not an admin
 *           content:
 *             application/json:
 *               example:
 *                 message: "Unauthorized - Admin access only"
 *         '404':
 *           description: Not Found - User with the specified ID not found
 *           content:
 *             application/json:
 *               example:
 *                 message: "User not found"
 *         '500':
 *           description: Internal Server Error - Unexpected error during user update
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error"
 */

msUsersRouter.patch("/:userId", isAdmin, apiProxy);
/**
 * @swagger
 * paths:
 *   /users/addUser:
 *     post:
 *       summary: Add a new user (admin access only)
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userObj:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     role:
 *                       type: string
 *                     sessionTimeOut:
 *                       type: number
 *                     createdDate:
 *                       type: string
 *                       format: date-time
 *                     userInfo:
 *                       type: object
 *                       properties:
 *                         firstName:
 *                           type: string
 *                         lastName:
 *                           type: string
 *                       description: User information.
 *                     permissions:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Array of user permissions.
 *                   required:
 *                     - username
 *                     - role
 *                     - sessionTimeOut
 *                     - createdDate
 *                     - userInfo
 *                     - permissions
 *               example:
 *                 userObj:
 *                   username: "new_user"
 *                   role: "user"
 *                   sessionTimeOut: 30
 *                   createdDate: "2023-01-01T12:00:00Z"
 *                   userInfo:
 *                     firstName: "New"
 *                     lastName: "User"
 *                   permissions:
 *                     - "read"
 *                     - "write"
 *       security:
 *         - isAdmin: []
 *       responses:
 *         '201':
 *           description: Successfully added a new user
 *           content:
 *             application/json:
 *               example:
 *                 message: "Successfully added a new user"
 *                 user:
 *                   _id: "generated_user_id"
 *                   username: "new_user"
 *                   role: "user"
 *                   sessionTimeOut: 30
 *                   createdDate: "2023-01-01T12:00:00Z"
 *                   userInfo:
 *                     firstName: "New"
 *                     lastName: "User"
 *                   permissions:
 *                     - "read"
 *                     - "write"
 *         '401':
 *           description: Unauthorized - User is not an admin
 *           content:
 *             application/json:
 *               example:
 *                 message: "Unauthorized - Admin access only"
 *         '500':
 *           description: Internal Server Error - Unexpected error during user creation
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal Server Error"
 */

msUsersRouter.post("/addUser", isAdmin, apiProxy);

module.exports = msUsersRouter;
