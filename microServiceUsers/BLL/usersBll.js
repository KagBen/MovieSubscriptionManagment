const User = require("../Module/UserModel");
require("dotenv").config();
const bcrypt = require("../utils/bcrypt");

const initializedAdmin = async () => {
  try {
    const admin = {
      username: "Admin1",
      password: await bcrypt.hashPassword(process.env.ADMIN_PASSWORD),
      role: "admin",
      sessionTimeOut: Infinity, //in minutes,
      createdDate: Date.now(),
      userInfo: { firstName: "admin", lastName: "premium" },
      permissions: [
        "View Subscriptions",
        "Create Subscriptions",
        "Delete Subscriptions",
        "View Movies",
        "Create Movies",
        "Delete Movies",
      ],
    };
    const setAdmin = new User(admin);
    await setAdmin.save();
  } catch (error) {
    throw new Error({ message: "error.message" });
  }
};

const addUser = async(userObj) => {
  const newUser = new User(userObj);

  if (!newUser.username) {
    // Handle missing required fields
    throw new Error({ message: "missing username - username is mandatory!" });
  }
  if (
    typeof newUser.sessionTimeOut !== "number" ||
    newUser.sessionTimeOut <= 0
  ) {
    // Handle invalid sessionTimeOut
    throw new Error({ message: "Invalid sessionTimeOut" });
  }
  await newUser.save();
  return {user:userObj,message:"user added successfully"}
};



const updateUser = async (userId, updateFields) => {
  try {
    // Use the findOneAndUpdate method to update a user by their ID
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId }, // Filter: Update the user with the specified userId
      { $set: updateFields }, // Update: Fields to be updated
      { new: true } // Options: Return the updated user
    );

    if (!updatedUser) {
      // Handle the case when the user with the given userId is not found
      throw new Error({message:"User not found"});
    }

    return {user:updatedUser,message:"user updated successfully"};
  } catch (error) {
    // Handle errors, such as validation errors or other issues
    throw new Error({message: error.message});
  }
};

const delUser = async(userId) => { 

  await User.findOneAndDelete(userId);
 return {userId:userId , message: "User deleted successfully"};

}


module.exports = { initializedAdmin };
