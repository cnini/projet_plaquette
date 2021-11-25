var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var tasks = [];
var completed = [];
var status = "";
var users = [];

// # Initialise users and usertypes

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("groupe6");
	dbo.collection("users").find({}).toArray(function(err, result) {
		if (err) throw err;
		users = result;
		db.close();
		});
	}); 

//calling express
var app = express();

//set the template engine
app.set('view engine', 'ejs');
//static data
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
	res.render('index', {status: status});
});

app.get("/crud", function(req, res){
	res.render('crud', {tasks: tasks , completed: completed});
});

app.get("/login", function(req, res){
	res.render('login');
});


app.get("/dashboard", function(req, res){
	res.render('dashboard/home', {users: users, });
});


app.get("/certificate/edit", function(req, res){
	res.render('certificate/edit');
});

app.post("/certificate/add", function(req, res){
	if(req.body){
		var certificate = [
			{
				"title":req.body.title,
				"description":req.body.description,
				"provider":req.body.provider,
				"number": req.body.number,
				"conditions": ""
			}
		]
		MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("groupe6");
		dbo.collection("users").insertMany(certificate, function(err, res) {
			if (err) throw err;
			console.log(res);
			db.close();
		  });
		res.redirect('/dashboard');
		});
	}
});


app.post('/addtask', function(req, res){
	if(req.body.newtask){
		tasks.push(req.body.newtask);
		res.redirect('/');
	}
});

app.post('/addtask', function(req, res){
	if(req.body.newtask){
		tasks.push(req.body.newtask);
		res.redirect('/');
	}
});

app.post('/removetask', function(req, res){
	completed.push(req.body.check);
	tasks.pop(req.body.check);
	res.redirect('/');
});

app.listen(4455, function(){
	console.log("Listening on port 4455");
});
