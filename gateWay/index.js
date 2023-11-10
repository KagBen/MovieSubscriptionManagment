const express = require('express');
const session = require("express-session");
const cors = require("cors");
const msUsersRouter = require("./Routers/userMsRouter");
require("dotenv").config();

const gatewayApp = express();


gatewayApp.use(express.json());
gatewayApp.use(cors());
gatewayApp.use(
    session({
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: true,
      //cookie: { maxAge: 1000 * 20 }, // time remaining in milliseconds - not required -but means that if didn’t do anything in 1000ms*20 = 20s  destroy the session
    })
  );

  gatewayApp.use("/users", msUsersRouter);

const PORT = process.env.PORT || 3000;
gatewayApp.listen(PORT, () => {
  console.log(`Gateway server is running on port ${PORT}`);
});
