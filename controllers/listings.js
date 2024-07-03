const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
  };

module.exports.create = async (req, res) => {
    res.render("./listings/new.ejs");
  };

module.exports.show = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing does not found");
      res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing });
  };

module.exports.edit = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing does not found");
      res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", { listing });
  };

module.exports.update = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing is updated succesfully");
    res.redirect(`/listings/${id}`);
  };

module.exports.delete = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing is deleted succesfully");
    res.redirect("/listings");
  };

module.exports.saveListings = async (req, res) => {
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Listing is added succesfully");
    res.redirect("/listings");
  };