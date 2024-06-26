
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        required: true,
    },
    price: Number,
    location: String,
    capacity: Number,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports  = Listing;