const Subscription = require("../Models/Subscriptions");

const addSubcription = async (subscription) => {};

const updateSubscription = async (subscriptionId, updateFields) => {};

const getAllSubscriptions = () => {};

const getSubscriptionByMemberId = async (memberId) => {};

const getAllMoviesSubscribersByMovieId = (movieId) => {};

module.exports = {
  addSubcription,
  getAllMoviesSubscribersByMovieId,
  getAllSubscriptions,
  updateSubscription,
  getSubscriptionByMemberId,
};
