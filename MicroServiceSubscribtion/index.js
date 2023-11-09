const express = require("express");
require("dotenv").config();
const cors = require("cors");
const ConnectDB = require("./Config/ConnectDB.js");
const port = process.env.PORT || 3002; //create env ... "3002"
const MemberRouter = require("./Routers/MemberRouter.js");
const MoviesRouter = require("./Routers/MovieRouter.js");
const SubscriptionsRouter = require("./Routers/SubscriptionRouter.js");
const Movies = require("./Dal/MoviesDal.js");
const Members = require("./Dal/MembersDal.js");

const app = express();

ConnectDB();

app.use(cors());
app.use(express.json());

//add here routers
app.use("/members", MemberRouter);
app.use("/movies", MoviesRouter);
app.use("/subscriptions", SubscriptionsRouter);

app.listen(port, async () => {
  await Movies.FillMovies(); // Fetch and save movies
  await Members.FillMembers(); // Fetch and save members
  console.log(`app is listening at http://localhost:${port}`);
});
