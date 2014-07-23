var express = require("express");
var request = require("request"); //Declaring the request requiring the request

var app = express();

//Directs to the index page or the homepage
app.get('/', function(req, res){
  res.render('index.ejs');
});

//Directs to the search page using form action
app.get('/search', function(req, res){
	// res.send('search page reached!');//response on the search page
	var query = req.query.searchTerm; //query refers to the parameter

	var url = "http://www.omdbapi.com/?s=" + query;
	request(url, function (error, response, body) {
		if (!error) {
		var data = JSON.parse(body); //Coverting JSON data into javascript
		res.render("results.ejs", {movieList: data.Search || [] });
		}
	});
});

//Directs it to the movieInfo page
app.get('/movie', function(req, res) {
	// res.send('info page reached!');
	var info = req.query.movieInfo;

	var url = "http://www.omdbapi.com/?i=" + info;
	request(url, function (error, response, body){
		if (!error) {
			var data = JSON.parse(body);
			res.render("info.ejs", {stuff: data});
		}
	});
});

app.listen(3000);