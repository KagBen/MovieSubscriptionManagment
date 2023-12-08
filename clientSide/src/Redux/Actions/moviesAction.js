import api from "../../apiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import {loadSubscriptions} from "./subscriptionsAction"
const url = `http://localhost:3000/movies`;

const setLoading = (_isLoading) => ({
  type: "SET_MOVIES_LOADING",
  payload: _isLoading,
});

const setMovies = (movies) => ({
  type: "SET_MOVIES",
  payload: movies,
});

const addMovie = (movieObj) => ({
  type: "ADD_MOVIE",
  payload: movieObj,
});

const updateMovie = (movieObj) => ({
  type: "UPDATE_MOVIE",
  payload: movieObj,
});

const deleteMovie = (movieId) => ({
  type: "DELETE_MOVIE",
  payload: movieId,
});

export const loadMovies = (jwtToken) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const resp = await  axios.get(url, {
      headers: {
        "jwt-access-token": jwtToken,
      },withCredentials: true,
    });
    const moviesData = resp.data.movies;
    dispatch(setMovies(moviesData));
    toast.success(resp.data.message);
  } catch (err) {
    toast.error(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const addMovies = (jwtToken, movieObj) => async (dispatch) => {
  try {
    const resp = await  axios.post(url, movieObj, {
      headers: {
        "jwt-access-token": jwtToken,
      },withCredentials: true,
    });
    const newMovieData = resp.data.movie;
    dispatch(addMovie(newMovieData));
    toast.success(resp.data.message);
  } catch (err) {
    toast.error(err.message);
  }
};

export const updateMovies =(jwtToken, movieId, movieObj) => async (dispatch) => {
    try {
      const resp = await  axios.patch(`${url}/${movieId}`, movieObj, {
        headers: {
          "jwt-access-token": jwtToken,
        },withCredentials: true,
      });
      const updateMovieData = resp.data.movie;
      dispatch(updateMovie(updateMovieData));
      toast.success(resp.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

export const deleteMovies = (jwtToken, movieId) => async (dispatch) => {
  try {
    const resp = await  axios.delete(`${url}/${movieId}`, {
      headers: {
        "jwt-access-token": jwtToken,
      },withCredentials: true,
    });
    const movieDeleted = resp.data.movieId;
    dispatch(deleteMovie(movieDeleted));
    dispatch(loadSubscriptions());
    toast.success(resp.data.message);
  } catch (err) {
    toast.error(err.message);
  }
};
