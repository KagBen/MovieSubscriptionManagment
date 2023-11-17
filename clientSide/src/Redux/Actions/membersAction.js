import axios from "axios";
import { toast } from "react-toastify";
import {loadSubscriptions} from "./subscriptionAction"
const url = `http://localhost:3000/members`;

const setLoading = (_isLoading) => ({
  type: "SET_MEMBER_LOADING",
  payload: _isLoading,
});

const setMember = (members) => ({
  type: "SET_MEMBERS",
  payload: members,
});

const addMember = (memberObj) => ({
  type: "ADD_MEMBER",
  payload: memberObj,
});

const updateMember = (memberObj) => ({
  type: "UPDATE_MEMBER",
  payload: memberObj,
});

const deleteMember = (memberId) => ({
  type: "DELETE_MEMBER",
  payload: memberId,
});

export const loadMembers = (jwtToken) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const resp = await axios.get(url, {
      headers: {
        "jwt-access-token": jwtToken,
      },
    });
    const membersData = resp.data.members;
    dispatch(setMember(membersData));
    toast.success(resp.data.message);
  } catch (err) {
    toast.error(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const addMembers = (jwtToken, memberObj) => async (dispatch) => {
  try {
    const resp = await axios.post(url, memberObj, {
      headers: {
        "jwt-access-token": jwtToken,
      },
    });
    const newMemberData = resp.data.member;
    dispatch(addMember(newMemberData));
    toast.success(resp.data.message);
  } catch (err) {
    toast.error(err.message);
  }
};

export const updateMembers = (jwtToken, memberId, memberObj) => async (dispatch) => {
    try {
      //status can me "add" member to subscription or "cancle"
      const resp = await axios.patch(`${url}/${memberId}`, memberObj,
        {
          headers: {
            "jwt-access-token": jwtToken,
          },
        }
      );
      const updateMemberData = resp.data.member;
      dispatch(updateMember(updateMemberData));
      toast.success(resp.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

export const deleteMembers = (jwtToken, memberId) => async (dispatch) => {
  try {
    const resp = await axios.delete(`${url}/${memberId}`, {
      headers: {
        "jwt-access-token": jwtToken,
      },
    });
    const memberDeleted = resp.data.memberId;
    dispatch(deleteMember(memberDeleted));
    dispatch(loadSubscriptions());
    toast.success(resp.data.message);
  } catch (err) {
    toast.error(err.message);
  }
};
