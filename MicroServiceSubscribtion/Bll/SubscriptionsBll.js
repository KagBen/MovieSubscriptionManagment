const Subscription = require("../Models/Subscriptions");

const addSubcription = async (subscriptionObj) => {
  try {
    const newSubscription = new Subscription(subscriptionObj);
    newSubscription.save();
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
            $first: {
              id: "$memberInfo._id",
              name: "$memberInfo.Name",
              email: "$memberInfo.Email",
              city: "$memberInfo.City",
            },
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
