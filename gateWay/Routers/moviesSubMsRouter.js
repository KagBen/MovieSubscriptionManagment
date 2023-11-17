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
    return `/movies${req.url}`;
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
 * /movies:
 *   get:
 *     summary: Get all movies
 *     description: Retrieve a list of all movies. Requires permission to view movies and a valid JWT token.
 *     tags:
 *       - Movies
 *     security:
 *       - JWTAuth: []  # Requires JWT authentication
 *       - PermissionViewMovies: []  # Requires permission to view movies
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "Successfully get all movies"
 *               movies:
 *                 - _id: "654e44b3eb7e4354d4799429"
 *                   Name: "Under the Dome"
 *                   Genres: ["Drama", "Science-Fiction", "Thriller"]
 *                   Image: "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"
 *                   Premiered: "2013-06-24"
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
 *       PermissionViewMovies:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 *         description: Provide a valid permission token to view movies
 */
msMoviesRouter.get("/", apiProxy);
/**
 * @openapi
 * /movies/MovieSubscribers:
 *   get:
 *     summary: Get all movies and their subscribers
 *     description: Retrieve a list of all movies and their subscribers. Requires permission to view movies and a valid JWT token.
 *     tags:
 *       - Movies
 *     security:
 *       - JWTAuth: []  # Requires JWT authentication
 *       - PermissionViewMovies: []  # Requires permission to view movies
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "Successfully get all movies subscribers"
 *               movies:
 *                 - movieId: "654e44b3eb7e4354d4799429"
 *                   Subscribers:
 *                     - MemberId: "654e44b3eb7e4354d4799609"
 *                       MemberInfo:
 *                         _id: "654e44b3eb7e4354d4799609"
 *                         Name: "Leanne Graham"
 *                         Email: "Sincere@april.biz"
 *                         City: "Gwenborough"
 *                       Date: "2023-05-22T00:00:00.000Z"
 *                       subscriptionId: "654e4884eb7e4354d4799713"
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
 *       PermissionViewMovies:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 *         description: Provide a valid permission token to view movies
 */
msMoviesRouter.get("/MovieSubscribers", apiProxy);
/**
 * @openapi
 * /movies/MovieSubscribers/{movieId}:
 *   get:
 *     summary: Get subscribers by movie ID
 *     description: Retrieve subscribers for a specific movie by its ID. Requires permission to view movies and a valid JWT token.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: The ID of the movie for which to retrieve subscribers.
 *         schema:
 *           type: string
 *     security:
 *       - JWTAuth: []  # Requires JWT authentication
 *       - PermissionViewMovies: []  # Requires permission to view movies
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "Successfully get all subscribers by movie id"
 *               subscribers:
 *                 - MemberId: "654e44b3eb7e4354d4799609"
 *                   MemberInfo:
 *                     _id: "654e44b3eb7e4354d4799609"
 *                     Name: "Leanne Graham"
 *                     Email: "Sincere@april.biz"
 *                     City: "Gwenborough"
 *                   Date: "2023-05-22T00:00:00.000Z"
 *                   subscriptionId: "654e4884eb7e4354d4799713"
 *       '401':
 *         description: Unauthorized, missing or invalid JWT token or insufficient permissions
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       '404':
 *         description: Movie not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Movie not found"
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
 *       PermissionViewMovies:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 *         description: Provide a valid permission token to view movies
 */

msMoviesRouter.get("/MovieSubscribers/:movieId", apiProxy);
/**
 * @openapi
 * /movies/{id}:
 *   get:
 *     summary: Get movie by ID
 *     description: Retrieve details of a movie by its ID. Requires permission to view movies and a valid JWT token.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie to retrieve.
 *         schema:
 *           type: string
 *     security:
 *       - JWTAuth: []  # Requires JWT authentication
 *       - PermissionViewMovies: []  # Requires permission to view movies
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "Successfully get movie by id"
 *               movie:
 *                 _id: "654e44b3eb7e4354d4799429"
 *                 Name: "Under the Dome"
 *                 Genres: ["Drama", "Science-Fiction", "Thriller"]
 *                 Image: "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"
 *                 Premiered: "2013-06-24"
 *       '401':
 *         description: Unauthorized, missing or invalid JWT token or insufficient permissions
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       '404':
 *         description: Movie not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Movie not found"
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
 *       PermissionViewMovies:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 *         description: Provide a valid permission token to view movies
 */
msMoviesRouter.get("/:id", apiProxy);
/**
 * @openapi
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     description: Create a new movie with the provided details. Requires permission to create movies and a valid JWT token.
 *     tags:
 *       - Movies
 *     security:
 *       - JWTAuth: []  # Requires JWT authentication
 *       - PermissionCreateMovies: []  # Requires permission to create movies
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
 *                   Name:
 *                     type: string
 *                     description: The name of the movie.
 *                   Genres:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: The genres of the movie.
 *                   Image:
 *                     type: string
 *                     description: The image URL of the movie.
 *                   Premiered:
 *                     type: string
 *                     description: The premiere date of the movie.
 *             example:
 *               MovieObj:
 *                 Name: "Under the Dome"
 *                 Genres: ["Drama", "Science-Fiction", "Thriller"]
 *                 Image: "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"
 *                 Premiered: "2013-06-24"
 *     responses:
 *       '201':
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Successfully created movie"
 *               movie:
 *                 _id: "654e44b3eb7e4354d4799429"
 *                 Name: "Under the Dome"
 *                 Genres: ["Drama", "Science-Fiction", "Thriller"]
 *                 Image: "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"
 *                 Premiered: "2013-06-24"
 *       '401':
 *         description: Unauthorized, missing or invalid JWT token or insufficient permissions
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
 *       PermissionCreateMovies:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 *         description: Provide a valid permission token to create movies
 */
msMoviesRouter.post("/", permissions("Create Movies"), apiProxy);
/**
 * @openapi
 * /movies/{id}:
 *   patch:
 *     summary: Update a movie by ID
 *     description: Update a movie by its ID. Allows partial updates. Requires a valid JWT token.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie to update.
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
 *               MovieObj:
 *                 type: object
 *                 properties:
 *                   Name:
 *                     type: string
 *                     description: The name of the movie. (Optional)
 *                   Genres:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: The genres of the movie. (Optional)
 *                   Image:
 *                     type: string
 *                     description: The image URL of the movie. (Optional)
 *                   Premiered:
 *                     type: string
 *                     description: The premiere date of the movie. (Optional)
 *             example:
 *               MovieObj:
 *                 Name: "Updated Movie Name"
 *     responses:
 *       '200':
 *         description: Movie updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Successfully updated movie"
 *               movie:
 *                 _id: "654e44b3eb7e4354d4799429"
 *                 Name: "Updated Movie Name"
 *                 Genres: ["Drama", "Science-Fiction", "Thriller"]
 *                 Image: "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"
 *                 Premiered: "2013-06-24"
 *       '401':
 *         description: Unauthorized, missing or invalid JWT token
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       '404':
 *         description: Movie not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Movie not found"
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
msMoviesRouter.patch("/:id", permissions("Update Movies"), apiProxy);
/**
 * @openapi
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     description: Delete a movie by its ID. Also removes the movie from all subscriptions. Requires permission to delete movies and a valid JWT token.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie to delete.
 *         schema:
 *           type: string
 *     security:
 *       - JWTAuth: []  # Requires JWT authentication
 *       - PermissionDeleteMovies: []  # Requires permission to delete movies
 *     responses:
 *       '200':
 *         description: Movie deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Successfully deleted movie"
 *               movieId: "654e44b3eb7e4354d4799429"
 *       '401':
 *         description: Unauthorized, missing or invalid JWT token or insufficient permissions
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       '404':
 *         description: Movie not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Movie not found"
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
 *       PermissionDeleteMovies:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 *         description: Provide a valid permission token to delete movies
 */

msMoviesRouter.delete("/:id", permissions("Delete Movies"), apiProxy);

module.exports = msMoviesRouter;
