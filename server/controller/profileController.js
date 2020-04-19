const multer = require("multer");
const fs = require("fs");

const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
const Profile = require("../model/profilePicModel");
const User = require("../model/userModel");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../public");
  },
  filename: function (req, file, cb) {
    let filename =
      file.fieldname + "-" + Math.floor(Date.now() / 10000) + file.originalname;

    cb(null, filename);
  },
});

// optional filter
function fileFilter(req, file, cb) {
  let dir = __dirname + "/../public";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
exports.upload = multer({
  storage: storage,
  limits: {
    files: 1,
    fieldSize: 2 * 1024 * 1024, // 2 MB (max file size)
  },
  fileFilter: fileFilter,
});

//  this route is  protected
exports.uploadProfilePic = CatchAsync(async (req, res, next) => {
  const avatar = req.file;

  // make sure file is available
  if (!avatar) {
    return next(new AppError("Please provide a picture", 404));
  } else {
    let profile;

    // save path to database
    if (req.user.profileId) {
      // if profile id already exists then we can set a new profile id, i.e update the profile pic
      // make sure that the user is the valid user whit that profile id

      profile = await Profile.findByIdAndUpdate(
        req.user.profileId,
        {
          imageUrl: avatar.filename,
        },
        {
          new: true,
        }
      );
      console.log("image updated");
    } else {
      profile = await Profile.create({
        userId: req.user.id,

        imageUrl: avatar.filename,
      });
    }

    await User.findByIdAndUpdate(req.user.id, { profileId: profile._id });

    res.status(200).json({
      status: "success",
      data: {
        message: "Image Uploaded Successfully",
      },
    });
  }
});
