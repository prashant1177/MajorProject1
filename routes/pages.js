const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pages.js");

// Index Route
router.get("/aboutus", pagesController.aboutus);    

router.get("/contact", pagesController.contact);   
router.get("/help", pagesController.help);   
router.get("/privacy", pagesController.privacy);   
router.get("/terms", pagesController.terms);      


module.exports = router;
