import React from "react";
import {} from "react-icons/fa";
import placeholder from "../../placeholder/placeholderProfile.png";
import Panel from "./Panel";
import LikeCounter from "./LikeCounter";

const User = ({ user }) => {
  // console.log(user);
  return (
    <div className="user">
      {user.profileId ? (
        <img
          src={`http://localhost:8000/${user.profileId.imageUrl}`}
          alt="profile pic"
        />
      ) : (
        <img src={placeholder} alt="profile pic" />
      )}
      <Panel otherUserId={user._id} />
      <LikeCounter user={user} />
    </div>
  );
};

export default User;
