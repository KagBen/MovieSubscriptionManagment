const express = require("express");
const connectDb = require("./config/mongoDb");
require("dotenv").config();

connectDb();
const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log("microService Users is listening on port" + process.env.PORT);
});
