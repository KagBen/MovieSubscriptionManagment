const MovieBll = reqiure("../Bll/MoviesBll.js");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await MovieBll.GetAllMovie();
    res.status(200).send({ message: "Succefuly get all movies", movies });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await MovieBll.GetMovieById(movieId);
    res.status(200).send({ message: "Succefuly get movie by id", movie });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newMovie = req.params.body;
    const movie = await MovieBll.AddMovie(newMovie);
    res.status(200).send({ message: "Succefuly add new movie", movie });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieToUpdate = req.params.body;
    const movie = await MovieBll.UpdateMovie(movieId, movieToUpdate);
    res.status(200).send({ message: "Succefuly update movie", movie });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const deleteMovie = await MovieBll.DeleteMovie(movieId);
    res.status(200).send({ message: "Succefuly delete movie", deleteMovie });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

module.exports = router;
