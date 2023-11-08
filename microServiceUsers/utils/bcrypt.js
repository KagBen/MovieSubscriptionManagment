const bcrypt = require("bcrypt");
require("dotenv").config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPassword = async (passwordRecieved) => {
  try {
    const hashedPassword = await bcrypt.hash(passwordRecieved, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw new Error(err.message);
  }

};

const verifyPassword = async (passwordRecieved, hashedPassword) => {
  try {
    const passwordsMatch = await bcrypt.compare(passwordRecieved, hashedPassword);
    return passwordsMatch;
  } catch (err) {
    throw new Error("Error comparing passwords: " + err.message);
  }
};
//hello


module.exports = { verifyPassword, hashPassword };
