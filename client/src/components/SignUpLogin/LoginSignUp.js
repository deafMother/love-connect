import React from "react";
import LogIn from "./Login";
import SignUp from "./SignUp";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const SignLog = ({ loggedId }) => {
  if (loggedId) {
    return <Redirect to="/" />;
  }
  return (
    <div className="form-container">
      <LogIn />
      <SignUp />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedId: state.loggedIn,
  };
};

export default connect(mapStateToProps)(SignLog);
