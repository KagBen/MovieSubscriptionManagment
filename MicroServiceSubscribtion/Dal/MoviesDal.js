const axios = require("axios");
const Movie = require("../Models/MovieModel");
const MoviesUrl = `https://api.tvmaze.com/shows`;

const FillMovies = async () => {
  try {
    const resp = await axios.get(MoviesUrl);

    if (resp.status === 200) {
      const data = await resp.data;

      for (const movie of data) {
        const { name, genres, image, premiered } = movie;

        const newMovie = new Movie({
          Name: name,
          Genres: genres,
          Image: image ? image.medium : "",
          Premiered: premiered,
        });

        await newMovie.save();
      }
    } else {
      throw new Error("Cannot get movies from url - " + MoviesUrl);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { FillMovies };
