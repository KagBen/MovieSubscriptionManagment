import api from "../../apiConfig";
import axios from "axios";
import { toast } from "react-toastify";
const url = `http://localhost:3000/users`;

const setLoading = (_isLoading) => ({
  type: "SET_USER_LOADING",
  payload: _isLoading,
});

const setUsers = (users) => ({
  type: "SET_USERS",
  payload: users,
});

const addUser = (userObj) => ({
  type: "ADD_USER",
  payload: userObj,
});

const updateUser = (userObj) => ({
  type: "UPDATE_USER",
  payload: userObj,
});

const deleteUser = (userId) => ({
  type: "DELETE_USER",
  payload: userId,
});

export const loadUsers = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const resp = await axios.get(url,{withCredentials: true});
    const usersData = resp.data.users;
    dispatch(setUsers(usersData));
    toast.success(resp.data.message);
  } catch (err) {
    console.log(err);
    toast.error(err.response.data.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const addUsers = (jwtToken, userObj) => async (dispatch) => {
  try {
    const resp = await axios.post(`${url}/addUser`, userObj, {
      headers: {
        "jwt-access-token": jwtToken,
      },withCredentials: true,
    });
    const newUserData = resp.data.user;
    dispatch(addUser(newUserData));
    toast.success(resp.data.message);
  } catch (err) {
    toast.error(err.message);
  }
};

export const updateUsers = (jwtToken, userId, userObj) => async (dispatch) => {
  try {
    const resp = await axios.patch(`${url}/${userId}`, userObj, {
      headers: {
        "jwt-access-token": jwtToken,
      },withCredentials: true,
    });
    const updateUserData = resp.data.user;
    dispatch(updateUser(updateUserData));
    toast.success(resp.data.message);
  } catch (err) {
    toast.error(err.message);
  }
};

export const deleteUsers = (jwtToken, userId) => async (dispatch) => {
  try {
    const resp = await axios.delete(`${url}/${userId}`, {
      headers: {
        "jwt-access-token": jwtToken,
      },withCredentials: true,
    });
    const userDeleted = resp.data.userId;
    dispatch(deleteUser(userDeleted));
    toast.success(resp.data.message);
  } catch (err) {
    toast.error(err.message);
  }
};
