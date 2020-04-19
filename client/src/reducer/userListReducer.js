import { FETCH_USERS } from "../actions/types";

export const userList = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return (state = action.data);
    default:
      return state;
  }
};
