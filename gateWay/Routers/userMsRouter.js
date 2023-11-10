const express = require("express");
const axios = require("axios");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const msUsersRouter = express.Router();
const userMs = "http://localhost:3001/users";


msUsersRouter.post("/login", async (req, res) => {
    try {
        console.log({userLoginInfo:req.body.userLoginInfo})
      const userResponse = await axios.post(
        `${userMs}/login`,
        {userLoginInfo:req.body.userLoginInfo}
      );
      console.log(userResponse.data); 
      res.send(userResponse.data);
    } catch (err) {
    res.status(401).send(err.response.data);
    }
  });
  
module.exports = msUsersRouter;
