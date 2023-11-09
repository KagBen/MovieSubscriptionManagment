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

const addUser = async (userObj) => {
  const newUser = new User(userObj);
  try {
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
    return { user: userObj, message: "user added successfully" };
  } catch (error) {
    if (error.code === 11000 || error.code === 11001) {
      // Handle the duplicate key error here
      console.error(
        "Duplicate key error: A document with the same unique field value already exists."
      );
      // Perform custom actions or return a specific error response
      throw new Error({ message: "Username or key already exists." });
    } else {
      // Handle other errors
      throw new Error({ message: error.message }); // Re-throw other errors for higher-level handling
    }
  }
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
      throw new Error({ message: "User not found" });
    }

    return { user: updatedUser, message: "user updated successfully" };
  } catch (error) {
    // Handle errors, such as validation errors or other issues
    throw new Error({ message: error.message });
  }
};

const deleteUser = async (userId) => {
  await User.findOneAndDelete(userId);
  return { userId: userId, message: "User deleted successfully" };
};

const getAllUsers = async () => {
  const allUsers = await User.find().select('-password');
  return allUsers;
};
//userLoginInfo - handle three fields _id , username, and password
const registerUser = async (userLoginInfo) => {
  try {
    const hashedPassword = await bcrypt.hashPassword(userLoginInfo.password);
    const res = await updateUser(userLoginInfo.id, {
      password: hashedPassword,
    });
    return res;
  } catch (error) {
    throw new Error({ message: error.message });
  }
};

const loginUser = async (userLoginInfo) => {
  const allUsers = await User.find(); //
  // do find because sure that there only one user with spcific username
  const userByUsername = allUsers.find(
    (user) => user.username === userLoginInfo.username
  );
  if (!userByUsername) {
    throw new Error({ message: `user ${userLoginInfo.username} not found` });
  }
  //after username is exist now testing the password for correctness
  const _isPasswordVerified = await bcrypt.verifyPassword(
    userLoginInfo.password,
    userByUsername.password
  );
  if (!_isPasswordVerified) {
    throw new Error({ message: "Wrong password , please try again" });
  } else {
    return userByUsername;
  }
};

module.exports = {
  initializedAdmin,
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
  registerUser,
};
