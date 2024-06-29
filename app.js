const express = require("express");
const app = express();

const mongoose = require("mongoose");

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");


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

const sessionOption = {
    secret: "secretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.get("/", (req, res)=>{
    res.send("hello");
});


app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

// app.get("/demouser", async(req, res)=>{
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student1",
//     }
//     );
//     let newUser = await User.register(fakeUser, "helloworld");
//     res.send(newUser);
// });



app.use("/listings", listingsRouter );
app.use("/listings/:id/reviews", reviewsRouter );
app.use("/", userRouter );


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
});