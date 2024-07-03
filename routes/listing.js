const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

// Index Route
router.get("/", wrapAsync(listingController.index));

// Create Route
router.get("/new", isLoggedIn, wrapAsync(listingController.create));

// Show route
router.get("/:id", wrapAsync(listingController.show));

// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.edit));

// Update route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.update)
);

// Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.delete));

// Save Route && Create route
router.post("/", validateListing, wrapAsync(listingController.saveListings));

module.exports = router;
