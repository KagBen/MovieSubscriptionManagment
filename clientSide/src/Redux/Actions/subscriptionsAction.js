import api from "../../apiConfig";
import axios from "axios";
import { toast } from "react-toastify";

const url = `http://localhost:3000/subscriptions`;

const setLoading = (_isLoading) => ({
  type: "SET_SUBSCRIPTION_LOADING",
  payload: _isLoading,
});

const setSubscription = (subscriptions) => ({
  type: "SET_SUBSCRIPTIONS",
  payload: subscriptions,
});

const addSubscription = (subscriptionObj) => ({
  type: "ADD_SUBSCRIPTION",
  payload: subscriptionObj,
});

const updateSubscription= (subscriptionObj) => ({
  type: "UPDATE_SUBSCRIPTION",
  payload: subscriptionObj,
});

const deleteSubscription = (subscriptionId) => ({
  type: "DELETE_SUBSCRIPTION",
  payload: subscriptionId,
});

export const loadSubscriptions = (jwtToken) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const resp = await  axios.get(url, {
      headers: {
        "jwt-access-token": jwtToken,
      },withCredentials: true,
    });
    const subscriptionsData = resp.data.allSubscriptions;
    dispatch(setSubscription(subscriptionsData));
    toast.success(resp.data.message);
  } catch (err) {
    toast.error(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const addSubscriptions = (jwtToken, subscriptionObj) => async (dispatch) => {
  try {
    const resp = await  axios.post(url, subscriptionObj, {
      headers: {
        "jwt-access-token": jwtToken,
      },withCredentials: true,
    });
    const newSubscriptionData = resp.data.subscription;
    dispatch(addSubscription(newSubscriptionData));
    toast.success(resp.data.message);
  } catch (err) {
    toast.error(err.message);
  }
};

export const updateSubscriptions =(jwtToken, subscriptionId,status, movieObj) => async (dispatch) => {
    try {
      //status can me "add" movie to subscription or "cancle"
      const resp = await  axios.patch(`${url}/${subscriptionId}/${status}`, movieObj, {
        headers: {
          "jwt-access-token": jwtToken,
        },withCredentials: true,
      });
      const updateSubscriptionData = resp.data.subscription;
      dispatch(updateSubscription(updateSubscriptionData ));
      toast.success(resp.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

export const deleteSubscriptions = (jwtToken, subscriptionId) => async (dispatch) => {
  try {
    const resp = await  axios.delete(`${url}/${subscriptionId}`, {
      headers: {
        "jwt-access-token": jwtToken,
      },withCredentials: true,
    });
    const subscriptionDeleted = resp.data.subscriptionId;
    dispatch(deleteSubscription(subscriptionDeleted));
    toast.success(resp.data.message);
  } catch (err) {
    toast.error(err.message);
  }
};
