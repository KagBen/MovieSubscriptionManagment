const express = require("express");
const cors = require("cors");
const connectDb = require("./config/mongoDb");
const userBll = require("./BLL/usersBll");
require("dotenv").config();

connectDb();
const app = express();
app.use(cors());
app.use(express.json());

userBll.initializedAdmin();

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

app.post("/users/login", async (req, res) => {
  try {
    const { username, password } = req.body.userLoginInfo || {};
    if (!username || !password) {
      return res
        .status(401)
        .send({ message: "Username and password are required" });
    }
    const user = await userBll.loginUser({ username, password });
    res.status(200).send({ message: "Login successful", user });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

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

//register as update
app.patch("/users/register", async (req, res) => {
  // Handle register user
  try {
    const { username, password } = req.body.userRegisterInfo || {};
    if (!username || !password) {
      return res
        .status(401)
        .send({ message: "Username and password are required for register" });
    }
    const user = await userBll.registerUser({ username, password });
    res.status(200).send({ message: "Register successful", user });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

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
