const express = require("express");
const session = require("express-session");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const msUsersRouter = require("./Routers/userMsRouter");
const msMembersRouter = require("./Routers/membersSubMsRouter");
const msMoviesRouter = require("./Routers/moviesSubMsRouter");
const msSubscriptionsRouter = require("./Routers/subscriptionsSubMsRouter");
const jwtVerify = require("./middlewears/jwtVerify");
const swaggerOptions = require("./config/swaggerConfig");
require("dotenv").config();

const gatewayApp = express();
const swaggerSpec = swaggerJsdoc(swaggerOptions);
gatewayApp.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
gatewayApp.use(express.json());

gatewayApp.use(cors());

gatewayApp.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

gatewayApp.use((req, res, next) => {
  console.log("Request URL:", req.originalUrl);
  console.log("Session ID:", req.sessionID);
  // ... other logging
  next();
});
gatewayApp.use("/users", msUsersRouter);
gatewayApp.use("/members", jwtVerify, msMembersRouter);
gatewayApp.use("/movies", jwtVerify, msMoviesRouter);
gatewayApp.use("/subscriptions", jwtVerify, msSubscriptionsRouter);

const PORT = process.env.PORT || 3000;
gatewayApp.listen(PORT, () => {
  console.log(`Gateway server is running on port ${PORT}`);
});
