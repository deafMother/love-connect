import axios from "../api";
import { LOGGED_IN, FETCH_USERS, USER_INFO, SOCKET } from "./types";
import history from "../history";
import openSocket from "socket.io-client";

// get jwt from the local storage
const getJWT = () => {
  let jwtToken = localStorage.getItem("love-jwt");
  if (!jwtToken) {
    jwtToken = "";
  }
  var config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  };

  return config;
};

// check loggin status
export const checkLogginStatus = () => async (dispatch, getState) => {
  const config = getJWT();
  try {
    const response = await axios.get("/user/checkLoginStatus", config);
    dispatch({
      type: LOGGED_IN,
      status: true,
    });
    dispatch({
      type: USER_INFO,
      data: response.data.data.data,
    });
    dispatch(listenForLikes());
  } catch (err) {
    dispatch({
      type: LOGGED_IN,
      status: false,
    });
  }
};

// login
export const login = (formValues) => async (dispatch, getState) => {
  try {
    const response = await axios.post("/user/login", formValues);
    localStorage.setItem("love-jwt", response.data.token);

    dispatch({
      type: LOGGED_IN,
      status: true,
    });
    dispatch({
      type: USER_INFO,
      data: response.data.data.user,
    });
    dispatch(listenForLikes());
  } catch (err) {
    alert("error please try later");
    dispatch({
      type: LOGGED_IN,
      status: false,
    });
  }
};

// signout user
export const register = (formValues) => async (dispatch, getState) => {
  try {
    const response = await axios.post("/user", formValues);
    history.push("/");
    alert("User successfully registered. Please login to continut");
  } catch (err) {
    alert("unable to login please try again.");
  }
};

// logout
export const logout = () => async (dispatch, getState) => {
  localStorage.setItem("love-jwt", "");
  dispatch({
    type: LOGGED_IN,
    status: false,
  });

  dispatch({
    type: USER_INFO,
    data: {},
  });

  history.push("/");
  dispatch(listenForLikes());
};

// fetch all users

export const fetchUsers = () => async (dispatch, getState) => {
  const config = getJWT();
  // make network request
  try {
    const response = await axios.get("/user", config);
    dispatch({
      type: FETCH_USERS,
      data: response.data.data.users,
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

//  upload profile image

export const uploadProfilePic = (formValues) => async (dispatch, getState) => {
  const config = getJWT();

  try {
    await axios.post("/user/uploadProfilePic", formValues, config);
    dispatch(checkLogginStatus());
    history.push("/");
    alert("profile pic succeffully changes");
  } catch (err) {
    alert("Error in changing profile pic please try later");
  }
};

export const userFeature = (userId, forAction = "") => async (
  dispatch,
  getState
) => {
  const config = getJWT();

  try {
    const response = await axios.patch(
      `/user/${forAction}/${userId}`,
      null,
      config
    );
    alert(response.data.data.message);
    dispatch(checkLogginStatus());
    dispatch(fetchUsers());

    if (forAction === "like" && response.data.data.message === "user liked ") {
      dispatch(emitLike(userId));
    }
  } catch (err) {
    alert("Error in blocking pic please try later");
  }
};

//  subscribt tosocket

export const subscribetoSocket = () => async (dispatch) => {
  const socket = openSocket("http://localhost:8000");
  dispatch({
    type: SOCKET,
    data: socket,
  });
};

export const emitLike = (userId) => async (dispathc, getState) => {
  const socket = getState().socket;
  console.log("emited like");
  socket.emit("like", {
    likefor: userId,
  });
};

//  only loggen users can listen for likes
export const listenForLikes = () => async (dispatch, getState) => {
  const socket = getState().socket;
  const loggedIn = getState().loggedIn;

  if (socket && loggedIn) {
    console.log("listening forlikes");
    socket.on("like", function (data) {
      const user = getState().userInfo;

      if (user._id === data.forUser) {
        alert(data.message);
      }
    });
  }
};
