const Subscription = require("../Models/Subscriptions");

const addSubcription = async (subscriptionObj) => {
  const newSubscription = new Subscription(subscriptionObj);
  newSubscription.save();
  return newSubscription;
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

const getAllSubscriptions = async () => {
  try {
    const formattedSubscriptions = await Subscription.aggregate([
      {
        $lookup: {
          from: "members",
          localField: "MemberId",
          foreignField: "_id",
          as: "memberInfo",
        },
      },
      {
        $unwind: "$memberInfo",
      },
      {
        $unwind: "$Movies",
      },
      {
        $lookup: {
          from: "movies",
          localField: "Movies.MovieId",
          foreignField: "_id",
          as: "movieInfo",
        },
      },
      {
        $unwind: "$movieInfo",
      },
      {
        $group: {
          _id: "$_id",
          memberInfo: {
            id: { $first: "$memberInfo._id" },
            name: { $first: "$memberInfo.Name" },
            email: { $first: "$memberInfo.Email" },
            city: { $first: "$memberInfo.City" },
          },
          subscriptionId: { $first: "$_id" },
          movies: {
            $push: {
              movieInfo: {
                id: "$movieInfo._id",
                name: "$movieInfo.Name",
                imgUrl: "$movieInfo.Image",
              },
              date: "$Movies.Date",
            },
          },
        },
      },
    ]);

    return formattedSubscriptions;
  } catch (error) {
    console.error("Error retrieving subscriptions:", error);
    throw new Error(error.message);
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

const getAllMoviesSubscribersByMovieId = async (movieId) => {
  const allSubscriptions = await Subscription.find();
  const membersAndDate = [];
  for (sub of allSubscriptions) {
    for (mov of sub.Movies) {
      if (mov.movieId.toString() === movieId) {
        membersAndDate.push({ MemberId: sub.MemberId, Date: mov.Date });
      }
    }
  }
  if (membersAndDate.length == 0) {
    throw new Error(`no subscriptions for movie ${movieId}`);
  } else {
    return membersAndDate;
  }
};
const deleteSubscription = async (subscriptionId) => {
  await Subscription.findByIdAndDelete(subscriptionId);
  return "delete subscription";
};

module.exports = {
  deleteSubscription,
  addSubcription,
  getAllMoviesSubscribersByMovieId,
  getAllSubscriptions,
  updateSubscription,
  getSubscriptionByMemberId,
};
