import React, { useEffect, useRef } from "react";
import { FaExpeditedssl, FaHeart, FaThumbsUp } from "react-icons/fa";
import { connect } from "react-redux";
import { userFeature } from "../../actions";

const Panel = ({ loggedIn, userFeature, otherUserId, userInfo }) => {
  useEffect(() => {}, [userInfo, otherUserId]);

  const handleLike = (event) => {
    if (!loggedIn) {
      return alert("Please Login/Register to enjoy features");
    }
    if (otherUserId === userInfo._id) {
      return alert("Cannot like self");
    }

    userFeature(otherUserId, "like");
  };
  const handleBlock = (event) => {
    if (!loggedIn) {
      return alert("Please Login/Register to enjoy features");
    }
    if (otherUserId === userInfo._id) {
      return alert("Cannot block self");
    }

    userFeature(otherUserId, "block");
  };
  const handleSuperLike = (event) => {
    if (!loggedIn) {
      return alert("Please Login/Register to enjoy features");
    }
    if (otherUserId === userInfo._id) {
      return alert("Cannot super like self");
    }

    userFeature(otherUserId, "superLike");
  };

  return (
    <div className="panel">
      <FaThumbsUp className="panel-btn" title="like" onClick={handleLike} />

      <FaHeart
        className="panel-btn"
        title="super like"
        onClick={handleSuperLike}
      />

      <FaExpeditedssl
        className="panel-btn"
        title="block"
        onClick={handleBlock}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    userInfo: state.userInfo,
  };
};

export default connect(mapStateToProps, { userFeature })(Panel);
