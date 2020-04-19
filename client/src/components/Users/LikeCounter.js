import React from "react";

const LikeCounter = ({ user }) => {
  return (
    <div className="like-counter">
      <span>{user.likedCount ? user.likedCount : 0}</span>
    </div>
  );
};

export default LikeCounter;
