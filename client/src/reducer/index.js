import { combineReducers } from "redux";
import { LOGGED_IN } from "../actions/types";
import { userList } from "./userListReducer";
import { userInfo } from "./userProfileReducer";

const loggedIn = (state = false, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return (state = action.status);
    default:
      return state;
  }
};

const socket = (state = {}, action) => {
  switch (action.type) {
    case "SOCKET":
      return (state = action.data);
    default:
      return state;
  }
};

export default combineReducers({
  loggedIn,
  users: userList,
  userInfo,
  socket,
});
