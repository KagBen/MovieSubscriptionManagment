const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    Name: { type: String, require: true, unique: true },
    Genres: [String],
    Image: String,
    Premiered: Date,
  },
  {
    versionKey: false,
  }
);

const Movie = mongoose.model("movie", movieSchema, "movies");

module.exports = Movie;
