const Booking = require("../models/booking");
const Listing = require("../models/listing");
const User = require("../models/user");
// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { fromDate, toDate, totalGuests } = req.body;

    let { id } = req.params;
    const user = req.user._id;
    const hotel = await Listing.findById(id);
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const totalDays = (to - from) / (1000 * 3600 * 24);
    let totalPrice = hotel.price;
    if (totalDays > 0) {
      totalPrice = Number(totalPrice * totalDays);
    }
    const newBooking = new Booking({
      hotel: hotel._id,
      user,
      fromDate,
      toDate,
      totalDays,
      totalGuests,
      totalPrice,
    });
    await newBooking.save();
    req.flash("success", "Booking created successfully!");
    res.redirect(`/bookings/details/${newBooking._id}`);
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/");
  }
};
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("hotel")
      .populate("user");
    res.render("./booking/booking.ejs", { bookings });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.getBooked = async (req, res) => {
  const { id } = req.params;
  try {
    const hotels = await Listing.find({ owner: id }).select("_id"); // Get only the hotel IDs

    // Step 2: Find bookings for these hotels by searching for the 'hotel' field in the booking model
    const bookings = await Booking.find({
      hotel: { $in: hotels.map((hotel) => hotel._id) }, // Find bookings for the hotels owned by this owner
    })
      .populate("hotel") // Populate hotel details in the booking
      .populate("user"); // Populate user details in the booking

    // Step 3: Render the bookings page with the fetched bookings
    res.render("./booking/booked.ejs", { bookings });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.getBookingDetails = async (req, res) => {
  try {
    const bookings = await Booking.findById(req.params.id)
      .populate("hotel")
      .populate("user");
      const owner = await User.findById(bookings.hotel.owner);
    res.render("./booking/bookingdetails.ejs", { bookings,owner });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
// getBookingDetails
