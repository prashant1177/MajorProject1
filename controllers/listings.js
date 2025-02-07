const Listing = require("../models/listing.js");

const Booking = require("../models/booking");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });const fs = require('fs');

module.exports.index = async (req, res) => {
  const { location, price } = req.query;
  let filter = location ? { location: { $regex: location, $options: "i" } } : {};
  filter = price ? { ...filter, price: { $lte: price } } : filter;

  const allListings = await Listing.find(filter);
  res.render("./listings/index.ejs", { allListings,filter });
};

module.exports.userListing = async (req, res) => {
  let { id } = req.params;

  const allListings = await Listing.find({ owner: id });
  res.render("./listings/userListing.ejs", { allListings });
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
  const bookings = await Booking.find({ hotel: id });

  const bookedDates = bookings.flatMap((booking) => {
    let dates = [];
    let currentDate = new Date(booking.fromDate);
    while (currentDate <= new Date(booking.toDate)) {
      dates.push(currentDate.toISOString().split("T")[0]); // Convert to YYYY-MM-DD
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  });
  res.render("./listings/show.ejs", { listing, bookedDates });
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
  
  let newPath = null;
  if(req.file){
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const postDoc = await Listing.findById(id);

  await Listing.findByIdAndUpdate(id, { title: req.body.title,
    description: req.body.description,
    image: newPath ? newPath : postDoc.cover,
    price: req.body.price,
    location: req.body.location,
    capacity: req.body.capacity,
    owner: req.user._id,});
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
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  

    let newListing = new Listing({
      title: req.body.title,
      description: req.body.description,
      image: newPath,
      price: req.body.price,
      location: req.body.location,
      capacity: req.body.capacity,
      owner: req.user._id,
    });

    await newListing.save();
    req.flash("success", "Listing added successfully");
    res.redirect("/listings");
  } catch (error) {
    console.error("Error saving listing:", error);
    res.status(500).send("Server Error");
  }
};
