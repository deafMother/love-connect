import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions";
import User from "./User";

const UserList = ({ fetchUsers, users }) => {
  useEffect(() => {
    // fetch all users
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <div className="userList">
        {users.length < 0 ? (
          <h5>fetching..</h5>
        ) : (
          users.map((user) => {
            return <User user={user} key={user._id} />;
          })
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps, { fetchUsers })(UserList);
