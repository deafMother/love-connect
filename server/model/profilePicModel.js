const mongoose = require("mongoose");

const profilePicSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "user id must be provided"],
  },
  imageUrl: {
    type: String,
    required: [true, "profile picture is required"],
  },
});

const Profile = mongoose.model("Profile", profilePicSchema);
module.exports = Profile;
