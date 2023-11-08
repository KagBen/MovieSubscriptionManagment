const user = require("../Module/UserModel");
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
    const setAdmin = new user(admin);
    setAdmin.save();
  } catch (error) {
    throw new Error({message:"error.message"});
  }
};

module.exports = { initializedAdmin };
