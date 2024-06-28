const express = require("express");
const router = express.Router(); //This is for getting listing ID from app.js

router.get("/signup", (req, res)=>{
    res.render("./users/signup.ejs");
});


module.exports = router;