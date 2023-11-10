const express = require("express");
const cors = require("cors");
const connectDb = require("./config/mongoDb");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerConfig");
const userBll = require("./BLL/usersBll");
require("dotenv").config();

connectDb();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
userBll.initializedAdmin();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users (admin only - check in the gateway)
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: Success. Returns a list of users.
 *       401:
 *         description: Unauthorized. Only admin can perform this action - or something went wrong.
 */
app.get("/users", async (req, res) => {
  // Handle get all users
  try {
    const users = await userBll.getAllUsers();
    res.status(200).send({ message: "Succefuly get All Users", users });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

//testing if can do post (only admin) in the gateway
/**
 * @openapi
 * /users/addUser:
 *   post:
 *     summary: Add a new user (admin only - check in the gateway)
 *     description: Add a new user to the system (admin only - check in gateway).
 *     requestBody:
 *       description: User object to be added.
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/userSchema.json'
 *     responses:
 *       200:
 *         description: Success. Returns the added user.
 *       401:
 *         description: Unauthorized. Only admin can perform this action - or something went wrong.
 */
app.post("/users/addUser", async (req, res) => {
  try {
    // const {username} = req.body.userLoginInfo || {};
    // if (!username) {
    //   return res.status(401).send({ message: "username (at least) is required" });
    // } - this done in mongoose ...
    const user = await userBll.addUser(req.body.userObj);
    res.status(200).send({ message: "User Added succefuly", user });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user by username and password.
 *     requestBody:
 *       description: User login information.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginInfo'
 *     responses:
 *       200:
 *         description: Login successful. Returns the user.
 *       400:
 *          description: Bad Request. Missing information.
 *       401:
 *         description: Unauthorized. Invalid username or password.
 */
app.post("/users/login", async (req, res) => {
  try {
    const { username, password } = req.body.userLoginInfo || {};
    if (!username || !password) {
      return res
        .status(400)
        .send({ message: "Username and password are required" });
    }
    const user = await userBll.loginUser({ username, password });
    res.status(200).send({ message: "Login successful", user });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});
//register as update
/**
 * @openapi
 * /users/register:
 *   patch:
 *     summary: Register a user
 *     description: Register a new user by providing a username and password.
 *     requestBody:
 *       description: User registration information.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegisterInfo'
 *     responses:
 *       200:
 *         description: Registration successful. Returns the registered user.
 *       400:
 *          description: Bad Request. Missing information.
 *       401:
 *         description: something went Wrong.
 */
app.patch("/users/register", async (req, res) => {
  // Handle register user
  try {
    const { username, password } = req.body.userRegisterInfo || {};
    if (!username || !password) {
      return res
        .status(400)
        .send({ message: "Username and password are required for register" });
    }
    const user = await userBll.registerUser({ username, password });
    res.status(200).send({ message: "Register successful", user });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

/**
 * @openapi
 * /users/{userId}:
 *   patch:
 *     summary: Update a user
 *     description: Update user details by providing user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Fields to be updated in the user object.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateFields'
 *     responses:
 *       200:
 *         description: User updated successfully. Returns the updated user.
 *       400:
 *         description: Bad Request. At least one update field is required.
 *       401:
 *         description: Unauthorized. Invalid user ID or update fields.
 */
app.patch("/users/:userId", async (req, res) => {
  // Handle update user
  try {
    const { userId } = req.params;
    const userUpdateFields = req.body.userUpdateFields;
    // Check if there are at least some update fields
    if (!userUpdateFields || Object.keys(userUpdateFields).length === 0) {
      return res
        .status(400)
        .send({ message: "At least one update field is required" });
    }
    const user = await userBll.updateUser(userId, userUpdateFields);
    res.status(200).send({ message: "user Updated successful!", user });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});


/**
 * @openapi
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by providing user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       401:
 *         description:Something went wrong.
 */
app.delete("/users/:userId", async (req, res) => {
  // Handle delete user
  try {
    const userId = req.params.userId;
    await userBll.deleteUser(userId);
    res.status(200).send({ message: "user deleted successfully" });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("microService Users is listening on port" + process.env.PORT);
});
