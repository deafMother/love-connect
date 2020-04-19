import { USER_INFO } from "../actions/types";

export const userInfo = (state = {}, action) => {
  switch (action.type) {
    case USER_INFO:
      return { ...action.data };
    default:
      return state;
  }
};
