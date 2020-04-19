import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import placeholder from "../../placeholder/placeholderProfile.png";

import { uploadProfilePic } from "../../actions";

const ProfilePick = ({ loggedIn, userInfo, uploadProfilePic }) => {
  const profileFile = useRef();
  const imageDemo = useRef();
  const [form, setForm] = useState({});
  if (!loggedIn) {
    return <Redirect to="/" />;
  }
  const onSubmit = (event) => {
    event.preventDefault();
    if (form.file) {
      const form_main = new FormData();
      form_main.append("avatar", form.file);
      uploadProfilePic(form_main);
    } else {
      alert("Please select a picture to upload");
    }
  };

  return (
    <div className="profile-ctn">
      <h3>Select Profile Image</h3>
      <div className="image-ctn">
        {userInfo.profileId ? (
          <img
            src={`http://localhost:8000/${userInfo.profileId.imageUrl}`}
            ref={imageDemo}
            alt="profile pic"
          />
        ) : (
          <img src={placeholder} ref={imageDemo} alt="profile pic" />
        )}
      </div>
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        <div>
          <div className="upload-btn-wrapper">
            <button className="btn">Upload a file</button>
            <input
              type="file"
              name="avatar"
              ref={profileFile}
              onChange={() => {
                imageDemo.current.src = URL.createObjectURL(
                  profileFile.current.files[0]
                );
                setForm({ file: profileFile.current.files[0] });
              }}
            />
          </div>
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    userInfo: state.userInfo,
  };
};

export default connect(mapStateToProps, { uploadProfilePic })(ProfilePick);
