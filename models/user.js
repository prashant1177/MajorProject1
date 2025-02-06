const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);