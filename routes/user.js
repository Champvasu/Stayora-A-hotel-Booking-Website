const express = require("express");
const router = express.Router();
const User = require("../Models/user.js")
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/users.js");

router.route("/signup")
      .get(userController.renderSignupFormRequest)
      .post(wrapAsync(userController.postSignupRequest));  

router.route("/login")
      .get(userController.renderLoginFormRequest)
      .post(saveRedirectUrl,passport.authenticate("local",{failureRedirect: "/login",failureFlash: true,}),userController.postLoginFormRequest);


router.get("/logout",userController.logoutRequest);

module.exports = router;
