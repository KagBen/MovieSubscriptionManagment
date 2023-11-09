const Movie = require("../Models/MovieModel");

const GetAllMovies = () => {
  return Movie.find();
};

const GetMovieById = (id) => {
  return Movie.findById(id);
};

const AddMovie = async (movie) => {
  try {
    const NewMovie = new Movie(movie);
    NewMovie.save();
    return "Add new movie successfully";
  } catch (error) {
    if (error.code === 11000 || error.code === 11001) {
      // Handle the duplicate key error here
      console.error(
        "Duplicate key error: A document with the same unique field value already exists."
      );
      // Perform custom actions or return a specific error response
      throw new Error("Movie name already exists.");
    } else {
      // Handle other errors
      throw new Error(error.message); // Re-throw other errors for higher-level handling
    }
  }
};

const UpdateMovie = async (movieId, updateFields) => {
  try {
    // Use the findOneAndUpdate method to update a user by their ID
    const updatedMovie = await Movie.findOneAndUpdate(
      { _id: movieId }, // Filter: Update the user with the specified userId
      { $set: updateFields }, // Update: Fields to be updated
      { new: true } // Options: Return the updated user
    );

    if (!updatedMovie) {
      // Handle the case when the user with the given userId is not found
      throw new Error("Movie not found when try to update");
    }
    return updatedMovie;
  } catch (error) {
    if (error.code === 11000 || error.code === 11001) {
      // Handle the duplicate key error
      throw new Error(
        "Duplicate key error: The provided data conflicts with existing data."
      );
    } else {
      // Handle other errors, such as validation errors or other issues
      throw new Error(error.message);
    }
  }
};

const DeleteMovie = (movieId) => {
  return Movie.findByIdAndDelete(movieId);
};

module.exports = {
  GetAllMovies,
  GetMovieById,
  AddMovie,
  UpdateMovie,
  DeleteMovie,
};
