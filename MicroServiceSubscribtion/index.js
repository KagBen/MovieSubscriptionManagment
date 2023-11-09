const express = require("express");
require("dotenv").config();
const cors = require("cors");
const ConnectDB = require("./Config/ConnectDB.js");
const port = process.env.PORT || 3002; //create env ... "3002"

const Movies = require("./Dal/MoviesDal.js");
const Members = require("./Dal/MembersDal.js");

const app = express();

ConnectDB();

app.use(cors());
app.use(express.json());

app.listen(port, async () => {
  await Movies.FillMovies(); // Fetch and save movies
  await Members.FillMembers(); // Fetch and save members
  console.log(`app is listening at http://localhost:${port}`);
});
