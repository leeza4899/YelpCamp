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
router.post("/register",function(req,res){
	var newUser = new User({username: req.body.username});
	// if(req.body.adminCode == 'secret'){
	// 	newUser.isAdmin = true;
	// }
	User.register(newUser, req.body.password , function(err,User){
		if(err){
			req.flash("error", err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req,res, function(){
			req.flash("success", "Successfully Signed Up! Nice to meet you "+ User.username);
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

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
	   return next();
	   }
	res.redirect("/login");
}


module.exports = router;