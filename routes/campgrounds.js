var express = require("express");
var router = express.Router();
var campground = require("../models/campgrounds");
var user = require("../models/user");
var middleware = require("../middleware");
var request = require("request");


//index show all camps
router.get("/campgrounds", function(req,res){
//camps from db
	campground.find({}, function(err, dbcampgrounds){
		if(err){
			console.log(err);
		}
		else {
			// Added this block, to check if foundCampground exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
            if (!dbcampgrounds) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
            // If the upper condition is true this will break out of the middleware and prevent the code below to crash our application
		// request('https://maps.googleapis.com/maps/api/geocode/json?address=sardine%20lake%20ca&key=AIzaSyBtHyZ049G_pjzIXDKsJJB5zMohfN67llM', function (error, response, body) {
		// if (!error && response.statusCode == 200) {
		// console.log(body);
			res.render("campgrounds/index", {camps: dbcampgrounds});
		}

});
	// 	}
	// });
});

router.post("/campgrounds", middleware.isLoggedIn, function(req,res){
	//get data from form
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username : req.user.username
	}
	var newCampground = {name:name, price:price, image: image, desc: desc, author: author};
	//create a new camp and save to db
	campground.create(newCampground, function(err, newlycreated){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");	
		}
	});
	//campgrounds.push(newCampground);
	// add to page
	// go back to campgrounds page
});

router.get("/campgrounds/new", middleware.isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});

router.get("/campgrounds/:id", function(req,res){
	campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/show",{campground: foundCampground});
		}
	});
});

//edit route
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
	campground.findById(req.params.id,function(err,foundCampground){
		// Added this block, to check if foundCampground exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
            if (!foundCampground) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
            // If the upper condition is true this will break out of the middleware and prevent the code below to crash our application
		res.render("campgrounds/edit",{campground : foundCampground})
	});
});

//update the campground route
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req,res){
	campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			req.flash("error", "Something went wrong");
			res.redirect("/campgrounds");
		} else{
			req.flash("success", "Campground edit successful!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


//destroy camp route

router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req,res){
	campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground Deleted");
			res.redirect("/campgrounds");
		}
	})
});


module.exports = router;



