// authUtils.js

import axios from "axios";

export const AuthLogout = async (nav, toast, userData) => {
  try {
    const logoutUser = await axios.get("http://localhost:3000/users/logout");
    sessionStorage.clear();
    nav("/");
    toast.success(logoutUser.data);
  } catch (err) {
    console.log(err);
    toast.error(await err.response.data.message);
  }
};
export const loginToServer = async (nav, toast, userData) => {
  try {
    console.log("here ");
    const loginUser = await axios.post("http://localhost:3000/users/login", {
      userLoginInfo: userData,
    });
    sessionStorage.userToken = loginUser.data.token;
    sessionStorage.userData = JSON.stringify(loginUser.data.user);
    //! dont forget if it first time /(check if name is already setted then to home if not immidatly)
    localStorage.setItem(
      "sessionExpirationTime",
      loginUser.data.user.sessionTimeOut
        ? new Date().getTime() + loginUser.data.user.sessionTimeOut * 60 * 1000
        : Infinity
    );
    nav("/home");
    toast.success("User logged in");
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

export const RegisterUserToServer = async (
  toast,
  handleLoginClick,
  userData
) => {
  try {
    const RegisterUser = await api.patch("http://localhost:3000/users/register", {
      userRegisterInfo: userData,
    });
    console.log(RegisterUser);
    // toast.success("User register Successfully");
    handleLoginClick();
  } catch (err) {
    console.log(err);
    toast.error(err.response.data.message);
  }
};
