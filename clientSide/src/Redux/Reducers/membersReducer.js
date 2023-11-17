const initialState = {
  members: [],
  membersLoading: false,
};

const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MEMBERS": {
      return { ...state, members: action.payload };
    }

    case "ADD_MEMBER": {
      const addedMembersToOthers = [...state.members, action.payload];
      return { ...state, members: addedMembersToOthers };
    }

    //in update we find the member delete him and add again .
    case "UPDATE_MEMBER": {
      const memberIndex = state.members.findIndex(
        (member) => member._id === action.payload._id
      );
      // Create a new array with the updated movie
      const updatedMembers = [
        ...state.members.slice(0, memberIndex),
        action.payload, // Updated movie
        ...state.members.slice(memberIndex + 1),
      ];
      return {
        ...state,
        members: updatedMembers,
      };
    }

    case "DELETE_MEMBER": {
      return {
        ...state,
        members: state.members.filter(
          (member) => member._id !== action.payload
        ),
      };
    }

    case "SET_MEMBER_LOADING": {
      return { ...state, membersLoading: action.payload };
    }

    default:
      return state;
  }
};

export default membersReducer;
