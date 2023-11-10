const express = require("express");
const session = require("express-session");
const cors = require("cors");
const msUsersRouter = require("./Routers/userMsRouter");
const msMembersRouter = require("./Routers/membersSubMsRouter");
const msMoviesRouter = require("./Routers/moviesSubMsRouter");
const msSubscriptionsRouter = require("./Routers/subscriptionsSubMsRouter");
const jwtVerify = require("./middlewears/jwtVerify");
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
gatewayApp.use("/members", jwtVerify, msMembersRouter);
gatewayApp.use("/movies", jwtVerify, msMoviesRouter);
gatewayApp.use("/subscriptions", jwtVerify, msSubscriptionsRouter);

const PORT = process.env.PORT || 3000;
gatewayApp.listen(PORT, () => {
  console.log(`Gateway server is running on port ${PORT}`);
});
