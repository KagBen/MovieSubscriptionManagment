const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    Name: String,
    ManagerId: String
}, {
    versionKey: false
})

const Movie = mongoose.model("movie",  movieSchema , "movies")

module.exports = Movie 