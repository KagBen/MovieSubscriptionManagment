const axios = require("axios")
const MoviesUrl = `https://api.tvmaze.com/shows`

const GetMovies = () => {
    return axios.get(MoviesUrl)
}

module.exports = GetMovies 