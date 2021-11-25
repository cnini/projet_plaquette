

var express = require("express");
var bodyParser = require("body-parser");


var tasks = [];
var completed = [];
var status = "";

// # Initialise users and usertypes

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


app.post("/add_admin", function(req, res){
	var controllers = require('./connectDB');
	controllers.init_admin();
	if (req) throw req;
	status = "Opération terminé";
	res.redirect('/');
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
