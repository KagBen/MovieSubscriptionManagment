import axios from "axios";
import { toast } from "react-toastify";

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
    const resp = await axios.get(url, {
      headers: {
        "jwt-access-token": jwtToken,
      },
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

export const addMovies = (jwtToken) => async (dispatch) => {};
export const updateMovies = (jwtToken) => async (dispatch) => {};
export const deleteMovies = (jwtToken) => async (dispatch) => {};