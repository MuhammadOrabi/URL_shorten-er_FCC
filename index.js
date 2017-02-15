var express = require('express');
var bodyParser =require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.get('/new/*', function (req,res) {
	var urlstr = req.originalUrl;
	urlstr = urlstr.slice(5,urlstr.length);
   	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	if (regexp.test(urlstr)) {
		db.url.create({
			url: urlstr
		}).then(function (url) {
			var short = 'https://little-url.herokuapp.com/' + url.id;
			res.json({ "original_url": urlstr, "short_url": short });
		}, function (e) {
			res.send('something went wrong!');
		});
	}else{
		res.send('something wrong with the given URL!');
	}
});

app.get('/:id', function (req, res) {
	var id = parseInt(req.params.id,10);
	db.url.findById(id).then(function (url) {
		if(!!url){
			res.redirect(url.url);
		}else{
			res.status(404).send();
		}
	}).catch(function (e) {
		res.status(500).send();
	});
});

app.use(express.static(__dirname + '/public'));
db.sequelize.sync().then(function () {
	app.listen(PORT, function () {
		console.log('Express Started on port ' + PORT);
	});	
});