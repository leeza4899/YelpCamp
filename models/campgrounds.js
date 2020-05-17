var mongoose = require("mongoose");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	price: String,
	image:  String,
	desc: String,
	createAt: {type: Date, default: Date.now},
	author: {
		id:{
			type : mongoose.Schema.Types.ObjectID,
			ref : "User"
		},
		username : String	
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectID,
			ref: "Comment"
		}
	]
});	

module.exports = mongoose.model("campground", campgroundSchema);