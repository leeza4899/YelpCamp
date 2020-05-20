var express = require("express");
var router = express.Router();
var campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var passport = require("passport");
var User = require("../models/user");


//root route
router.get("/", function(req,res){
	res.render("landing");
});


//shows register form
router.get("/register", function(req,res){
	res.render("register");
});


//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User(
		{ username: req.body.username,
		 firstName: req.body.fname,
		lastName: req.body.lname,
		avatar: req.body.avatar,
		email: req.body.email
		});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/campgrounds"); 
        });
    });
});


//login routes
router.get("/login",function(req,res){
	res.render("login");
});

//handle login logic
//args = ("/login, middleware, callback")
router.post("/login", passport.authenticate("local", 
		{
		successRedirect: "/campgrounds",
		 failureRedirect: "/login"
		}), function(req,res){
});


//logout route
router.get("/logout", function(req,res){
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
});


// User profiles
router.get("/users/:id", function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if(err) {
      req.flash("error", "Something went wrong.");
      return res.redirect("/");
    }
    campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds) {
      if(err) {
        req.flash("error", "Something went wrong.");
        return res.redirect("/");
      }
      res.render("users/show", {user: foundUser, campgrounds: campgrounds});
    })
  });
});




module.exports = router;