const axios = require("axios")
const Movie = require("../Models/Movies")
const MoviesUrl = `https://api.tvmaze.com/shows`


const GetAllMovies = async () => {
    try {
        const resp = await axios.get(MoviesUrl)
        const data = await resp.json

        if (resp.status === 200) {

            for (const movie of data) {
                const { name, genres, image, premiered } = movie;

                const newMovie = new Movie({
                    Name: name,
                    Genres: genres,
                    Image: image ? image.medium : '',
                    Premiered: premiered
                });

                await newMovie.save();
            }
            console.log('All movies have been saved to the database.');
        }
        else {
            throw new Error({ message: "Cannot get movies from url - " + MoviesUrl })
        }

    } catch (error) {
        throw new Error({ message: error.message });
    }
};


module.exports = GetAllMovies