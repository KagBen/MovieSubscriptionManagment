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

app.listen(process.env.PORT, () => {
  console.log("microService Users is listening on port" + process.env.PORT);
});
