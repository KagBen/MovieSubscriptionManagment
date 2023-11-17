const initialState = {
  movies: [],
  moviesLoading: false,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MOVIES": {
      return { ...state, movies: action.payload };
    }
    case "ADD_MOVIE": {
      const addedMoviesToOthers = [...state.movies, action.payload];
      return { ...state, movies: addedMoviesToOthers };
    }

    //in update we find the movie delete him and add again .
    case "UPDATE_MOVIE": {
      const movieIndex = state.movies.findIndex(
        (movie) => movie._id === action.payload._id
      );
      // Create a new array with the updated movie
      const updatedMovies = [
        ...state.movies.slice(0, movieIndex),
        action.payload, // Updated movie
        ...state.movies.slice(movieIndex + 1),
      ];
      return {
        ...state,
        movies: updatedMovies,
      };
    }

    case "DELETE_MOVIE": {
      return {
        ...state,
        movies: state.movies.filter((movie) => movie._id !== action.payload),
      };
    }

    case "SET_MOVIES_LOADING": {
      return { ...state, moviesLoading: action.payload };
    }

    default:
      return state;
  }
};

export default moviesReducer;
