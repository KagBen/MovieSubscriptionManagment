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


export const loadUsers = (jwtToken) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const resp = await axios.get(url, {
        headers: {
          "jwt-access-token": jwtToken,
        },
      });
      const usersData = resp.data.users;
      dispatch(setUsers(usersData));
      toast.success(resp.data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      dispatch(setLoading(false));
    }
};

export const addUsers = (jwtToken, userObj) => async (dispatch) => {
    try {
      const resp = await axios.post(`${url}/addUser`, userObj, {
        headers: {
          "jwt-access-token": jwtToken,
        },
      });
      const newUserData = resp.data.user;
      dispatch(addUser(newUserData));
      toast.success(resp.data.message);
    } catch (err) {
      toast.error(err.message);
    }
};


//We don't retutn the user after updating
export const updateUsers =(jwtToken, userId, userObj) => async (dispatch) => {
    try {
      const resp = await axios.patch(`${url}/${userId}`, userObj, {
        headers: {
          "jwt-access-token": jwtToken,
        },
      });
      const updateUserData = resp.data;
      dispatch(updateUser(updateUserData));
      toast.success(resp.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };
