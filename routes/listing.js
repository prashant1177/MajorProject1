const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/WrapAsync.js");
const {ListingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");

// This is providing error message generated to error handler
const validateListing = (req, res, next) =>{
    let {error} = ListingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else{
        next();
    }
}


// Index Route
router.get("/", wrapAsync(async (req, res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
}));

// Create Route
router.get("/new", wrapAsync(async(req,res)=>{
    res.render("./listings/new.ejs");
}));

// Show route
router.get("/:id", wrapAsync(async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("./listings/show.ejs", {listing});
}));

// Edit route
router.get("/:id/edit",wrapAsync( async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id); 
    res.render("./listings/edit.ejs", {listing});
}));

// Update route
router.put("/:id",validateListing, wrapAsync(async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

// Delete Route
router.delete("/:id", wrapAsync(async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));


// Save Route && Create route
router.post("/",validateListing, wrapAsync(async (req, res)=>{
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

module.exports = router;