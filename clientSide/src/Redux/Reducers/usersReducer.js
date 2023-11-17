const initialState = {
    users : [],
    usersLoading : false
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USERS": {
          return { ...state, users: action.payload };
        }

        case "ADD_USER": {
          const addedUsersToOthers = [...state.users, action.payload];
          return { ...state, users: addedUsersToOthers };
        }
        
        //in update we find the user delete him and add again .
        case "UPDATE_USER": {
          const userIndex = state.users.findIndex(
            (user) => user._id === action.payload._id
          );
          // Create a new array with the updated users
          const updatedUsers = [
            ...state.users.slice(0, userIndex),
            action.payload, // Updated movie
            ...state.users.slice(userIndex + 1),
          ];
          return {
            ...state,
            users: updatedUsers 
          };
        }
    
        case "DELETE_USER": {
          return {
            ...state,
            users: state.users.filter((user) => user._id !== action.payload),
          };
        }
    
        case "SET_USER_LOADING": {
          return { ...state, usersLoading: action.payload };
        }
    
        default:
          return state;
      }

}
