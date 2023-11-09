const Member = require("../Models/MemberModel");

const getMembers = async () => {
  return Member.find();
};

const getMemberById = async (memberId) => {
  return Member.findById(memberId);
};

const deleteMember = async (memberId) => {
  Member.findByIdAndDelete(memberId);
  return "deleted";
};

const updateMember = async (memberId, updateFields) => {
  try {
    if(updateFields.hasOwnProperty("Name") && updateFields.Name.length === 0 )
    {
        throw new Error("Error : Trying to update member with empty name");
    }
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

const addMember = async(memberObj) => { 
   const newMember = new Member(memberObj);
   await newMember.save();
   return newMember;
}

module.exports = {getMembers,getMemberById,deleteMember,updateMember ,addMember}