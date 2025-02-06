const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Listing", // Assuming your hotel model is named "Listing"
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  totalDays: {
    type: Number,
    required: true,
  },
  totalGuests: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure that fromDate is always before toDate
bookingSchema.pre("save", function (next) {
  if (this.fromDate >= this.toDate) {
    return next(new Error("Check-in date must be before check-out date"));
  }
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
