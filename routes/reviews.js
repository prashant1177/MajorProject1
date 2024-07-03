const express = require("express");
const router = express.Router({ mergeParams: true }); //This is for getting listing ID from app.js

const wrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn, isAuthor, validateReview } = require("../middleware.js");
const reviewCotroller = require("../controllers/reviews.js");

// Adding new review
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewCotroller.addReview)
);

// Delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewCotroller.deleteReview)
);

module.exports = router;
 