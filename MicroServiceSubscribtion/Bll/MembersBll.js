const Member = require("../Models/MemberModel");
const Subscription = require("../Models/Subscriptions");
const getMembers = async () => {
  return Member.find();
};

const getMemberById = async (memberId) => {
  const member = await Member.findById(memberId);
  return member;
};

const deleteMember = async (memberId) => {
  try {
    const allSubscriptions = Subscription.find();
    const subscriptionByMemberId = allSubscriptions.find(
      (subscription) => subscription.MemberId.toString() === memberId
    );
    if (subscriptionByMemberId) {
      Subscription.findByIdAndDelete(subscriptionByMemberId._id);
    }
    Member.findByIdAndDelete(memberId);
    return "deleted";
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateMember = async (memberId, updateFields) => {
  try {
    const updateMember = Member.findOneAndUpdate(
      { _id: userId }, // Filter: Update the user with the specified userId
      { $set: updateFields }, // Update: Fields to be updated
      { new: true }
    );
    if (!updateMember) {
      // Handle the case when the user with the given userId is not found
      throw new Error("Member not found");
    }
    return updateMember;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addMember = async (memberObj) => {
  const newMember = new Member(memberObj);
  await newMember.save();
  return newMember;
};

module.exports = {
  getMembers,
  getMemberById,
  deleteMember,
  updateMember,
  addMember,
};
