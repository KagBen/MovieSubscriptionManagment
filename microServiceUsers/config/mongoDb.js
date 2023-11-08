const mongoose = require("mongoose");
require("dotenv").config();

const mongoDbPath = process.env.MONGODB_PATH || "mongodb://localhost:27017/cinemaManagment";

const connectDb = () => {
  mongoose
    .connect(mongoDbPath)
    .then(console.log("Connected to MongoDB server at " + mongoDbPath))
    .catch((err) => {
      throw new Error({message : `Failed to connect to MongoDB server dut to :  + ${err}`});
    });
};

module.exports = connectDb;
