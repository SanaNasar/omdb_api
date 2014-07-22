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
	var query = req.query.searchTerm;
  // res.send("search page: " + query);

	var url = "http://www.omdbapi.com/?s=" + query;
	request(url, function (error, response, body) {
		if (!error) {
			// res.send("response recieved: " + body);
		var data = JSON.parse(body); //Coverting JSON data into javascript
		res.render("results.ejs", {movieList: data.Search || [] });
		}
	});

});

app.listen(3000);
