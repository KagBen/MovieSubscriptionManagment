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

const updateSubscription = async (subscriptionId, updateFields) => {
  try {
    // if (!updateFields.hasOwnProperty("MemberId")) {
    //   throw new Error("Error : missing member Id its required");
    // }
    const updateSubscription = Subscription.findOneAndUpdate(
      { _id: subscriptionId }, // Filter: Update the user with the specified userId
      { $set: updateFields }, // Update: Fields to be updated
      { new: true }
    );
    if (!updateMember) {
      // Handle the case when the user with the given userId is not found
      throw new Error("Subscription not found");
    }
    return updateSubscription;
  } catch (error) {
    throw new Error(error.message);
  }
};
// const getAllSubscriptions = async() =>  {
//   try {
//     // Retrieve all subscriptions
//     const subscriptions = await Subscription.find();

//     // Map through subscriptions to format the data
//     const formattedSubscriptions = await Promise.all(
//       subscriptions.map(async (subscription) => {
//         // Retrieve member details
//         const member = await Member.findById(subscription.MemberId);

//         // Map through movies in the subscription to get movie details
//         const movies = await Promise.all(
//           subscription.Movies.map(async (movie) => {
//             const movieDetails = await Movie.findById(movie.MovieId);
//             return {
//               movieInfo: {
//                 id: movieDetails._id,
//                 name: movieDetails.Name,
//                 imgUrl: movieDetails.Image,
//               },
//               date: movie.Date,
//             };
//           })
//         );

//         // Return the formatted subscription
//         return {
//           subscriptionId: subscription._id,
//           memberInfo: {
//             id: member._id,
//             name: member.Name,
//             email: member.Email,
//             city: member.City,
//           },
//           movies,
//         };
//       })
//     );

//     return formattedSubscriptions;
//   } catch (error) {
//     console.error("Error retrieving subscriptions:", error);
//     throw error;
//   }
// }
// const getAllSubscriptions = async () => {
//   try {
//     const formattedSubscriptions = await Subscription.aggregate([
//       {
//         $lookup: {
//           from: "members",
//           localField: "MemberId",
//           foreignField: "_id",
//           as: "memberInfo",
//         },
//       },
//       {
//         $unwind: "$memberInfo",
//       },
//       {
//         $unwind: "$Movies",
//       },
//       {
//         $lookup: {
//           from: "movies",
//           localField: "Movies.MovieId",
//           foreignField: "_id",
//           as: "movieInfo",
//         },
//       },
//       {
//         $unwind: "$movieInfo",
//       },
//       {
//         $group: {
//           _id: "$_id",
//           memberInfo: {
//             $first: {
//               id: "$memberInfo._id",
//               name: "$memberInfo.Name",
//               email: "$memberInfo.Email",
//               city: "$memberInfo.City",
//             },
//           },
//           subscriptionId: { $first: "$_id" },
//           movies: {
//             $push: {
//               movieInfo: {
//                 id: "$movieInfo._id",
//                 name: "$movieInfo.Name",
//                 imgUrl: "$movieInfo.Image",
//               },
//               date: "$Movies.Date",
//             },
//           },
//         },
//       },
//     ]);

//     return formattedSubscriptions;
//   } catch (error) {
//     console.error("Error retrieving subscriptions:", error);
//     throw new Error(error.message);
//   }
// };

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
    (subscription) => subscription.memberId === memberId
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
  deleteSubscription,
  addSubcription,
  getAllSubscriptions,
  updateSubscription,
  getSubscriptionByMemberId,
};
