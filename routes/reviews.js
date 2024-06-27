const express = require("express");
const router = express.Router({mergeParams: true});

const {reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/WrapAsync.js");
const reviews = require("../models/reviews.js");
const Listing = require("../models/listing.js");


// Review Validation client side
const validateReview = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else{
        next();
    }
}




// Adding new review
router.post("/", validateReview, wrapAsync(async(req, res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReviews = new reviews(req.body.review);
    listing.reviews.push(newReviews);

    await newReviews.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
}));


// Delete review route
router.delete("/:reviewId", wrapAsync(async(req,res)=>{
    let {id, reviewId} = req.params;

   await Listing.findByIdAndUpdate(id, {$pull: {reviewId}});
   await reviews.findByIdAndDelete(reviewId);
   
   res.redirect(`/listings/${id}`);
}));


module.exports = router;