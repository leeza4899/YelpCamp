var express 	  = require("express");
var app 		  = express();
var bodyParser    = require("body-parser");
var mongoose      = require("mongoose");
var seedDB        = require("./seeds");
var flash 		  = require("connect-flash");
var cookieParser  = require("cookie-parser")
var passport      = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");


//require routes
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes    = require("./routes/comments");
var indexRoutes       = require("./routes/index");

//requiring all the db models
var campground = require("./models/campgrounds");
var Comment    = require("./models/comments");
var User       = require("./models/user");


//mongoose.connect("mongodb://localhost/YelpCamp")
mongoose.connect('mongodb+srv://lieyu:leeza4899@cluster0-36mf6.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}).then(()=>{
	console.log("connected to db");
}).catch(err=> {
	console.log('ERROR:', err.message);	
});
console.log(process.env.DATABASEURL)


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://lieyu:<leeza4899>@cluster0-36mf6.mongodb.net/test?retryWrites=true&w=majority";
// const connectdb = async()=>{
// 	await mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
// 	console.log('db connected...');
// }
// connectdb();
//mongodb+srv://lieyu:<leeza4899>@cluster0-36mf6.mongodb.net/test?retryWrites=true&w=majority
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(cookieParser('secret'));
//seedDB(); // seed the db;



// campground.create({
// 	name: "Cloud's end" ,
// 	image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
// 	desc: "This is a beautiful place with clouds all around you , no bathrooms. NO water. Beautiful sunrise and sunset views"
// },function(err, campground){
// 	if(err){
// 		console.log("OOPsie woopsie!");
// 	}
// 	else{
// 		console.log("Added a new campground to the db");
// 		console.log(campground)
// 	}
// });
app.locals.moment = require('moment');
//PASSPORT CONFIG
app.use(require("express-session")({
	secret: "leeza4899",
	resave: false,
	saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//middleware for login
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
	res.locals.currentUser =  req.user;
	next();
});

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

//using route files
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
	console.log("The YelpCamp server has begun!");
});









