const Movie = require("../Models/MovieModel");
const Subscription = require("../Models/Subscriptions");

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
    return NewMovie;
  } catch (error) {
    // Handle other errors
    throw new Error(error.message); // Re-throw other errors for higher-level handling
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
    // Handle other errors, such as validation errors or other issues
    throw new Error(error.message);
  }
};

const DeleteMovie = async (movieId) => {
  try {
    const movieSubscribers = await getAllMoviesSubscribersByMovieId(movieId);
    if (movieSubscribers.length != 0) {
      for (const sub of movieSubscribers) {
        const subToUpdate = await Subscription.findById(sub.subscriptionId);
        const MoviesUpdate = subToUpdate.Movies.filter(
          (movie) => movie.MovieId.toString() !== movieId
        );
        const updatedSubscribtion = await Subscription.findOneAndUpdate(
          { _id: sub._id }, // Filter: Update the user with the specified userId
          { $set: { Movies: MoviesUpdate } }, // Update: Fields to be updated
          { new: true } // Options: Return the updated user
        );
        if (!updatedSubscribtion) {
          throw new Error(
            "subsciption not found when try to update during delete movie from server"
          );
        }
      }
    }
   await Movie.findByIdAndDelete(movieId);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllMoviesSubscribersByMovieId = async (movieId) => {
  const allSubscriptions = await Subscription.find();
  const membersDateSubscription = [];
  for (const sub of allSubscriptions) {
    for (const mov of sub.Movies) {
      if (mov.MovieId.toString() === movieId) {
        membersAndDate.push({
          MemberId: sub.MemberId,
          Date: mov.Date,
          subscriptionId: sub._id,
        });
      }
    }
  }
  if (membersDateSubscription.length == 0) {
    throw new Error(`no subscriptions for movie ${movieId}`);
  } else {
    return membersDateSubscription;
  }
};

const getAllMoviesSubscribers = async () => {
  const allMovies = await Movie.find();
  const movieSubscribersArray = [];
  for (const mov of allMovies) {
    const movSubscribers = await getAllMoviesSubscribersByMovieId(mov._id);
    movieSubscribersArray.push({
      movieId: mov._id,
      Subscribers: movSubscribers,
    });
  }
  return movieSubscribersArray;
};
module.exports = {
  getAllMoviesSubscribers,
  GetAllMovies,
  GetMovieById,
  AddMovie,
  UpdateMovie,
  DeleteMovie,
  getAllMoviesSubscribersByMovieId,
};
