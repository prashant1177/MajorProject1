module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.flash("error", "Your are not logged in");
       return res.redirect("/listings");
    }
    next();
}