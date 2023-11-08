const user = require("../Module/UserModel");

const initializedAdmin = () => {
  const admin = {
    username: "Admin1",
    password: "123456",
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
  try {
    const setAdmin = new user(admin);
    setAdmin.save();
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = {initializedAdmin};