var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");

var data=[
	{
		name: "Cloud's rest", 
		image: "https://media.istockphoto.com/photos/camping-tent-in-a-camping-in-a-forest-by-the-river-picture-id911995140?k=6&m=911995140&s=612x612&w=0&h=U-yG-2eR8pOxLX_G8Eg9fDI1SOWYifxbb4BiiOhNNiI=",
		desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
	},
	{
		name: "Bello Beach", 
		image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
		desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
	},
	{
		name: "Cloud's End", 
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSgAyK-uuNW5fa39G0xWThWMrSWNxduavCc2ftRrHbUfFWtIYxw&usqp=CAU",
		desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
	}
]
function seedDB(){
	Campground.remove({}, function(err){
// 	if(err){
// 		console.log(err);
// 	}
// 	console.log("removed campground");
// 	data.forEach(function(seed){
// 	Campground.create(seed, function(err, campground){
// 		if(err){
// 				console.log(err);
// 			}
// 		else{
// 			console.log("Added a campground");
// 			//create a comment on a campground
// 			Comment.create(
// 				{
// 					text: "This Place is Great",
// 					author: "Arturo Roman"
// 				} ,function(err, comment){
// 					if(err){
// 					console.log(err);
// 					}
// 					else{
// 						campground.comments.push(comment);
// 						campground.save();
// 						console.log("comment");
// 					}
// 				})
// 		}
// 	});
// });
});
}
// add a few campground

//add a few comments

module.exports = seedDB;