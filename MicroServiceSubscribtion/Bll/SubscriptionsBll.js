const Subscription = require("../Models/Subscriptions");
const Member = require("../Models/MemberModel");
const Movie = require("../Models/MovieModel");
const addSubcription = async (subscriptionObj) => {
  try {
    const newSubscription = new Subscription(subscriptionObj);
    await newSubscription.save();
    return newSubscription;
  } catch (error) {
    if (error.code === 11000 || error.code === 11001) {
      console.error(
        "Duplicate key error: A document with the same unique field value already exists."
      );
      throw new Error(
        `MemberId ${subscriptionObj.MemberId} already have subscription`
      );
    } else {
      throw new Error(error.message);
    }
  }
};
const UpdateMovieSubscription = async (SubscriptionId, updateMovie, status) => {
  try {
    console.log(status);
    const subscription = await Subscription.findById(SubscriptionId);
    const allMovies = subscription.Movies;
    console.log(allMovies);
    if (status === "add") {
      allMovies.push({
        MovieId: updateMovie.MovieId,
        Date: new Date(updateMovie.Date),
      });
    }
    let restMovies = allMovies;
    if (status === "cancle") {
      const dateAsObj = new Date(updateMovie.Date);

      restMovies = allMovies.filter(
        (m) =>
          m.MovieId.toString() !== updateMovie.MovieId &&
          m.Date.toString() !== dateAsObj.toString()
      );
      console.log(restMovies);
    }
    const updSub = await updateSubscription(SubscriptionId, {
      MemberId: subscription.MemberId,
      Movies: status === "cancle" ? restMovies : allMovies,
    });
    return updSub;
  } catch (error) {
    throw new Error(error.message);
  }
};
const updateSubscription = async (subscriptionId, updateFields) => {
  try {
    const updateSubscription = Subscription.findOneAndUpdate(
      { _id: subscriptionId }, // Filter: Update the user with the specified userId
      { $set: updateFields }, // Update: Fields to be updated
      { new: true }
    );
    if (!updateSubscription) {
      // Handle the case when the user with the given userId is not found
      throw new Error("Subscription not found");
    }
    return updateSubscription;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
const getAllSubscriptions = async () => {
  try {
    // Retrieve all subscriptions
    const subscriptions = await Subscription.find();

    // Map through subscriptions to format the data
    const formattedSubscriptions = await Promise.all(
      subscriptions.map(async (subscription) => {
        try {
          // Retrieve member details
          const member = await Member.findById(subscription.MemberId);

          // Map through movies in the subscription to get movie details
          const movies = await Promise.all(
            subscription.Movies.map(async (movie) => {
              try {
                const movieDetails = await Movie.findById(movie.MovieId);

                return {
                  movieInfo: {
                    id: movieDetails._id,
                    name: movieDetails.Name,
                    imgUrl: movieDetails.Image,
                  },
                  date: movie.Date,
                };
              } catch (movieError) {
                throw new Error(
                  `Error retrieving movie details: ${movieError}`
                );
              }
            })
          );

          // Filter out movies that are null (not found)
          const validMovies = movies.filter((movie) => movie !== null);

          // Return the formatted subscription
          return {
            subscriptionId: subscription._id,
            memberInfo: {
              id: member._id,
              name: member.Name,
              email: member.Email,
              city: member.City,
            },
            movies: validMovies,
          };
        } catch (memberError) {
          throw new Error(`Error retrieving member details: ${memberError}`);
        }
      })
    );

    // Filter out subscriptions where member or movies are null
    const validSubscriptions = formattedSubscriptions.filter(
      (subscription) => subscription !== null
    );

    return validSubscriptions;
  } catch (error) {
    console.error("Error retrieving subscriptions:", error);
    throw error;
  }
};

const getSubscriptionByMemberId = async (memberId) => {
  const allSubscriptions = await getAllSubscriptions();
  const SubscriptionById = allSubscriptions.find(
    (subscription) => subscription.memberId.toString() === memberId
  );
  if (!SubscriptionById) {
    throw new Error(`${memberId} member not have subscription or not exist`);
  }
  return SubscriptionById;
};

const deleteSubscription = async (subscriptionId) => {
  await Subscription.findByIdAndDelete(subscriptionId);
  return "delete subscription";
};

module.exports = {
  UpdateMovieSubscription,
  deleteSubscription,
  addSubcription,
  getAllSubscriptions,
  updateSubscription,
  getSubscriptionByMemberId,
};
