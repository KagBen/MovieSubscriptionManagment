import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import membersReducer from "./Redux/Reducers/membersReducer.js";
import moviesReducer from "./Redux/Reducers/moviesReducer.js";
import subscriptionsReducer from "./Redux/Reducers/subscriptionsReducer.js";
import usersReducer from "./Redux/Reducers/usersReducer.js";
import { ThemeProvider } from "@mui/system";
import theme from "./Theme.js";

const rootReducer = combineReducers({
  users: usersReducer,
  movies: moviesReducer,
  subscriptions: subscriptionsReducer,
  members: membersReducer,
});

const composeEnhancer = composeWithDevTools(applyMiddleware(thunk));

const appStore = createStore(rootReducer, composeEnhancer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={appStore}>
    <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>

);
