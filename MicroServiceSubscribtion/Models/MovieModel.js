const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    Name: String,
    Genres: [String],
    Image: String,
    Premiered: Date
}, {
    versionKey: false
})

const Movie = mongoose.model("movie", movieSchema, "movies")

module.exports = Movie 