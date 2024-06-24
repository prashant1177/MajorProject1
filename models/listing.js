
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
        default: "https://unsplash.com/illustrations/32F1HmnROlY",
        set: (v)=>{
            v === "" ? "https://unsplash.com/illustrations/32F1HmnROlY" : v
        },
    },
    price: Number,
    location: String,
    capacity: Number,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports  = Listing;