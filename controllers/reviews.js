const reviews = require("../models/reviews.js");
const Listing = require("../models/listing.js");

module.exports.addReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReviews = new reviews(req.body.review);
    newReviews.author = req.user._id;
    listing.reviews.push(newReviews);

    await newReviews.save();
    await listing.save();

    req.flash("success", "Review is added succesfully");
    res.redirect(`/listings/${listing._id}`);
  };

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviewId } });
    await reviews.findByIdAndDelete(reviewId);
    req.flash("success", "Review is deleted succesfully");
    res.redirect(`/listings/${id}`);
  };

