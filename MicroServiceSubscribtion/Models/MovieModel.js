const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Genres: [String],
    Image: String,
    Premiered: String,
  },
  {
    versionKey: false,
  }
);

const Movie = mongoose.model("movie", movieSchema, "movies");

module.exports = Movie;
