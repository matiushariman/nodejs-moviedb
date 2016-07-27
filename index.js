var express = require("express");
var app = express();
var request = require("request");

// Serve public dir
app.use(express.static("public"));
// Set view engine ejs so that wont need to type .ejs extension
app.set("view engine", "ejs");

// Landing page
app.get("/", function(req, res){
	res.render("home");
});

// Display search results
app.get("/search", function(req, res){
	var title = req.query.title;
	var url = "http://www.omdbapi.com/?s=" +title;

	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var movies = JSON.parse(body);
			res.render("results", {movies:movies});
		}
	});
});


// Start listening to server
app.listen(process.env.PORT, process.env.IP, function(){
	console.log("The server has started");
})