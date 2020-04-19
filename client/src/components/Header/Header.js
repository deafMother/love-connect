import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { checkLogginStatus, logout, subscribetoSocket } from "../../actions";

function Header({ checkLogginStatus, loggedIn, logout, subscribetoSocket }) {
  // check login status when the header in mounted for the first time
  useEffect(() => {
    checkLogginStatus();
    subscribetoSocket();
  }, [checkLogginStatus]);
  return (
    <div className="header">
      <h5>
        <NavLink to="/" className="logo">
          Home
        </NavLink>
      </h5>
      <div>
        {loggedIn ? (
          <div>
            <NavLink to="/profile" className="btn-s">
              Upload Pic
            </NavLink>
            <NavLink to="/" className="btn-s">
              <span onClick={() => logout()}>Logout</span>
            </NavLink>
          </div>
        ) : (
          <NavLink to="/signUp" className="btn-s">
            SignUp/Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps, {
  checkLogginStatus,
  logout,
  subscribetoSocket,
})(Header);
