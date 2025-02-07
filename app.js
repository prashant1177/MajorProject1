require("dotenv").config(); // Load .env file variables

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
const bookingRouter = require("./routes/booking.js");
const pagesRouter = require("./routes/pages.js");


const MongoDBStore = require("connect-mongodb-session")(session);
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.json()); // To parse JSON data

app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(__dirname + "/uploads"));

const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});
const sessionOption = {
  secret: process.env.SESSION_SECRET || "secretcode",
  store: store,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // Set to false for local dev
    httpOnly: true, 
    maxAge: 3600000 
  },
};


app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // Ensure User.authenticate() is correctly called

// use static serialize and deserialize of model for passport session support
passport.serializeUser((user, done) => {
  done(null, user._id);  // Serialize user as the user._id
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Find user by the serialized id
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});


app.use((req, res, next) => {
  console.log("Current User:", req.user);
  console.log("Session Data:", req.session);  // Log the session
  console.log("Passport Data:", req.user);  // Debugging
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/bookings", bookingRouter);
app.use("/pages", pagesRouter);

app.use("/", userRouter);

// Page not found
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found but this is working"));
});

//Error handling middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong" } = err;
  res.render("error.ejs", { err });
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});

// J1zkX9zZr9t6F2vM

