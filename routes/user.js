const express = require("express");
const router = express.Router(); //This is for getting listing ID from app.js
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.get("/", userController.homeGet);
router.get("/signup", userController.signupGet);

router.post("/signup", WrapAsync(userController.signupPost));

router.get("/login", userController.loginGet);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.loginPost
);

router.get("/logout", userController.logout);

module.exports = router;
