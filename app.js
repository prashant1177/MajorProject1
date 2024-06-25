const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

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

app.get("/", (req, res)=>{
    res.send("hello");
});

// Index Route
app.get("/listings", async (req, res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
});

// Create Route
app.get("/listings/new", async(req,res)=>{
    res.render("./listings/new.ejs");
});

// Show route
app.get("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs", {listing});
});

// Edit route
app.get("/listings/:id/edit", async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", {listing});
});

// Update route
app.put("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

// Delete Route
app.delete("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})


// Save Route
app.post("/listings", async (req, res)=>{
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})


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