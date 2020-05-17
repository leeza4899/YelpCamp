var express = require("express");
var router = express.Router({mergeParams: true});
var campground = require("../models/campgrounds");
var user = require("../models/user");
var Comment = require("../models/comments");
var middleware = require("../middleware");

//comments new
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req,res){
	campground.findById(req.params.id,function(err, campgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new", {campground: campgrounds});
		}
	})
});

//comments create
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req,res){
	campground.findById(req.params.id,function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
		Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong");
					console.log(err);
				}
				else{
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Comment Added Succesfully!");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	})
});

//edit comment route
router.get("/campgrounds/:id/comments/:comments_id/edit",middleware.checkCommentsOwnership, function(req,res){
	Comment.findById(req.params.comments_id, function(err, foundComment){
		// Added this block, to check if foundCampground exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
            if (!foundComment) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
            // If the upper condition is true this will break out of the middleware and prevent the code below to crash our application
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id : req.params.id, comment : foundComment});
		}
	})
});


//update comment route
router.put("/campgrounds/:id/comments/:comments_id", middleware.checkCommentsOwnership, function(req,res){
	Comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, function(err, updatedComment){
		if(err){
			req.flash("error", "Something went wrong");
			res.redirect("back");
		} else {
			req.flash("success", "Comment Updated Succesfully!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


//destroy comment
router.delete("/campgrounds/:id/comments/:comments_id", middleware.checkCommentsOwnership, function(req,res){
	Comment.findByIdAndDelete(req.params.comments_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment Deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
});	
});

module.exports = router;
