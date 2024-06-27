const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/WrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {ListingSchema, reviewSchema} = require("./schema.js");
const reviews = require("./models/reviews.js");

const listings = require("./routes/listing.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/travel";
main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res)=>{
    res.send("hello");
});


// Review Validation client side
const validateReview = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else{
        next();
    }
}


app.use("/listings", listings);


// Adding new review
app.post("/listings/:id/reviews", validateReview, wrapAsync(async(req, res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReviews = new reviews(req.body.review);
    listing.reviews.push(newReviews);

    await newReviews.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
}));


// Delete review route
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req,res)=>{
    let {id, reviewId} = req.params;

   await Listing.findByIdAndUpdate(id, {$pull: {reviewId}});
   await reviews.findByIdAndDelete(reviewId);
   
   res.redirect(`/listings/${id}`);
}));


// Page not found 
app.all("*", (req, res, next)=>{
    next(new ExpressError(404, "Page not found"));
});

//Error handling middleware
app.use((err, req, res, next)=>{
    let {status = 500, message = "Something Went Wrong"} = err;
    res.render("error.ejs", {err});
});



// app.get("/test", async (req, res)=>{
//     let sampleListing = new Listing({
//         title: "First",
//         description: "A big traveller bus suitable for 12 people",
//         image: "",
//         price: "13",
//         location: "Muktainagar",
//         capacity: 12, 
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("success");
// });


app.listen(8080, ()=>{
    console.log("server is listening to port 8080");
})