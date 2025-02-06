const User = require("../models/user.js");
const Listing = require("../models/listing.js");

module.exports.signupGet = (req, res) => {
  res.render("./users/signup.ejs");
};

module.exports.signupPost = async (req, res) => {
  try {
    let { username, fullname, email, phone, password } = req.body;
    const newUser = new User({ username, fullname, email, phone });
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      } else {
        req.flash("success", "Signup successful");
        res.redirect("/listings");
      }
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.loginGet = (req, res) => {
  res.render("./users/login.ejs");
};

module.exports.loginPost = async (req, res) => {
  req.flash("success", "Welcome back");
  if (res.locals.redirectUrl) {
    res.redirect(res.locals.redirectUrl);
  } else {
    res.redirect("/listings");
  }
};

module.exports.logout = async (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      req.flash("success", "You are loggged out");
      res.redirect("/listings");
    }
  });
};

module.exports.homeGet = async (req, res) => {
  const allListings = await Listing.find({});
  console.log(allListings[0]);
  res.render("./listings/index.ejs", { allListings });
};
