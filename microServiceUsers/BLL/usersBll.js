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
    throw new Error(error.message);
  }
};
//app.post
const addUser = async (userObj) => {
  const newUser = new User(userObj);
  try {
    if (!newUser.username) {
      // Handle missing required fields
      throw new Error("missing username - username is mandatory!");
    }
    if (
      typeof newUser.sessionTimeOut !== "number" ||
      newUser.sessionTimeOut <= 0
    ) {
      // Handle invalid sessionTimeOut
      throw new Error("Invalid sessionTimeOut");
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
      throw new Error("Username or key already exists.");
    } else {
      // Handle other errors
      throw new Error(error.message); // Re-throw other errors for higher-level handling
    }
  }
};
//app . patch
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
      throw new Error("User not found");
    }

    return { user: updatedUser, message: "user updated successfully" };
  } catch (error) {
    if (error.code === 11000 || error.code === 11001) {
      // Handle the duplicate key error
      throw new Error(
        "Duplicate key error: The provided data conflicts with existing data."
      );
    } else {
      // Handle other errors, such as validation errors or other issues
      throw new Error(error.message);
    }
  }
};
//app.delete
const deleteUser = async (userId) => {
  await User.findOneAndDelete(userId);
  return { userId: userId, message: "User deleted successfully" };
};
//app.get
const getAllUsers = async () => {
  const allUsers = await User.find().select("-password");
  return allUsers;
};
//userLoginInfo - handle three fields  username, and password
const registerUser = async (userLoginInfo) => {
  try {
    // Checking if admin already set the user... (if not - can't register user)
    const allUsers = await User.find();
    const userByUsername = allUsers.find(
      (user) => user.username === userLoginInfo.username
    );

    if (!userByUsername) {
      throw new Error(`User ${userLoginInfo.username} not found`);
    }

    const hashedPassword = await bcrypt.hashPassword(userLoginInfo.password);
    const res = await updateUser(userByUsername._id, {
      password: hashedPassword,
    });

    return res;
  } catch (error) {
    console.error(`Error in registerUser: ${error.message}`);
    throw new Error(`Registration failed: ${error.message}`);
  }
};

const loginUser = async (userLoginInfo) => {
  const allUsers = await User.find(); //
  // do find because sure that there only one user with spcific username
  const userByUsername = allUsers.find(
    (user) => user.username === userLoginInfo.username
  );
  if (!userByUsername) {
    throw new Error(`user ${userLoginInfo.username} not found`);
  }
  //after username is exist now testing the password for correctness
  const _isPasswordVerified = await bcrypt.verifyPassword(
    userLoginInfo.password,
    userByUsername.password
  );
  if (!_isPasswordVerified) {
    throw new Error("Wrong password , please try again");
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
  loginUser,
};
