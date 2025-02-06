const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const wrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

// Index Route
router.get("/", wrapAsync(listingController.index));

router.get(
  "/:id/listings",
  isLoggedIn,
  wrapAsync(listingController.userListing)
);

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
  upload.single("image"),
  validateListing,
  wrapAsync(listingController.update)
);

// Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.delete));

// Save Route && Create route
router.post(
  "/",
  upload.single("image"),
  validateListing,
  wrapAsync(listingController.saveListings)
);

module.exports = router;
