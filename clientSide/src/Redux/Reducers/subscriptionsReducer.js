const initialState = {
  subscriptions: [],
  subscriptionsLoading: false,
};

const subscriptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SUBSCRIPTIONS": {
      return { ...state, subscriptions: action.payload };
    }

    case "ADD_SUBSCRIPTION": {
      const addedSubscriptionsToOthers = [
        ...state.subscriptions,
        action.payload,
      ];
      return { ...state, subscriptions: addedSubscriptionsToOthers };
    }

    //in update we find the member delete him and add again .
    case "UPDATE_SUBSCRIPTION": {
      const subscriptionIndex = state.subscriptions.findIndex(
        (subscription) => subscription._id === action.payload._id
      );
      // Create a new array with the updated movie
      const updatedSubscriptions = [
        ...state.subscriptions.slice(0, subscriptionIndex),
        action.payload, // Updated movie
        ...state.subscriptions.slice(subscriptionIndex + 1),
      ];
      return {
        ...state,
        subscriptions: updatedSubscriptions,
      };
    }

    case "DELETE_SUBSCRIPTION": {
      return {
        ...state,
        subscriptions: state.subscriptions.filter(
          (subscription) => subscription._id !== action.payload
        ),
      };
    }

    case "SET_SUBSCRIPTION_LOADING": {
      return { ...state, subscriptionsLoading: action.payload };
    }

    default:
      return state;
  }
};
export default subscriptionsReducer;
