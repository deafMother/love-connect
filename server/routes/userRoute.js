const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { upload, uploadProfilePic } = require("../controller/profileController");

router
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUsers);

router.route("/login").post(userController.loginIn);

router.route("/checkLoginStatus").get(userController.checkLoginStatus);
router
  .route("/uploadProfilePic")
  .post(userController.protect, upload.single("avatar"), uploadProfilePic);

router
  .route("/block/:blockID")
  .patch(userController.protect, userController.blockUser);
router
  .route("/like/:likeID")
  .patch(userController.protect, userController.likedUser);

router
  .route("/superLike/:likeID")
  .patch(userController.protect, userController.superLike);

module.exports = router;
