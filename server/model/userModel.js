const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "please provide a password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password not matching",
      },
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "please provide email"],
      trim: true,
      lowercase: true,
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    likedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    superLikedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    likedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.checkPassword = async function (
  givenPassword,
  userPassword
) {
  return await bcrypt.compare(givenPassword, userPassword);
};

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
