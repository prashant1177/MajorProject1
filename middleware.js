const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const { ListingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

const multer = require("multer");
const storage = multer.memoryStorage(); // Store files in memory

module.exports.upload = multer({ storage: storage }).single("image");


module.exports.validateListing = (req, res, next) => {
  let { error } = ListingSchema.validate({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    location: req.body.location,
    capacity: req.body.capacity,
  });
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Your are not logged in");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currentUser._id)) {
    req.flash("error", "Your are not owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currentUser._id)) {
    req.flash("error", "Your are not author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
