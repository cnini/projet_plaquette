var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/";

var tasks = [];
var completed = [];
var status = "";

var users = [];
var auth = [];

var certificates = [];
var partners = [];
var partners_campus = [];
var programmes = [];
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

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("groupe6");
    dbo.collection("certificate").find({}).toArray(function(err, results) {
        if (err) throw err;
        certificates = results;
        db.close();
    });
});

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("groupe6");
    var entreprise = { 'type': "entreprise" };

    dbo.collection("partner").find(entreprise).toArray(function(err, result) {
        if (err) throw err;
        partners = result;
        db.close();
    });
});

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("groupe6");
    var campus = { 'type': "campus" };

    dbo.collection("partner").find(campus).toArray(function(err, result) {
        if (err) throw err;
        partners_campus = result;
        db.close();
    });
});

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("groupe6");
    dbo.collection("programme").find({}).toArray(function(err, results) {
        if (err) throw err;
        programmes = results;
        db.close();
    });
});
//calling express
var app = express();

//set the template engine
app.set('view engine', 'ejs');
//static data
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.render('index', { status: status });
});

app.get("/crud", function(req, res) {
    res.render('crud', { tasks: tasks, completed: completed });
});

app.get("/login", function(req, res) {
    res.render('login');
});



app.post("/login", function(req, res) {
    if (auth.length == 1) {

        res.redirect('/login?status=done');

    } else {
        if (req.body) {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("groupe6");
                var auths = { 'mail': req.body.mail, 'pass': req.body.pass };

                dbo.collection("users").find(auths).toArray(function(err, result) {
                    if (err) throw err;
                    console.log(result);
                    auth = result;
                    db.close();
                });
                if (auth.length == 1) {
                    res.redirect('/dashboard');
                } else {
                    res.redirect('/login?status=false');
                }
            });
        }
    }
});

app.get("/register", function(req, res) {
    res.render('register');
});

app.get("/sc", function(req, res) {
    console.log(users);
});

app.post("/register", function(req, res) {
    if (req.body) {
        if (auth.length == 1) {
            res.redirect('/login?status=done');
        } else {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("groupe6");
                var users_admin = [{
                    "_id": new ObjectID(),
                    "name": req.body.name,
                    "pass": req.body.pass,
                    "mail": req.body.mail,
                    "tel": req.body.tel,
                    "address": req.body.address,
                    "type": "user",
                    "status": "3",
                    "roles": [
                        "3",
                        "4"
                    ]
                }];
                dbo.collection("users").insertMany(users_admin, function(err, res) {
                    if (err) throw err;
                    console.log(res, "New user done ");
                    db.close();
                });
                res.redirect('/login?status=register');
            });
        }
    }
});


app.post("/edit_user/:id", function(req, res) {
    if (req.body) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("groupe6");
            dbo.collection("users").updateOne({ _id: new ObjectID(req.params.id) }, {
                    $set: {
                        "name": req.body.name,
                        "pass": req.body.pass,
                        "mail": req.body.mail,
                        "tel": req.body.tel,
                        "address": req.body.address,
                        "type": auth[0]['type'],
                        "status": auth[0]['status']
                    }
                }, { upsert: true },
                function(err, res) {
                    if (err) throw err;
                    console.log("1 document update");
                    console.log(res);
                    db.close();
                });
            res.redirect('/dashboard?status=done&m=user update');
        });
    }
});

app.get("/logout", function(req, res) {
    if (auth.length == 1) {
        auth = [];
        console.log("Logout Auth")
        res.redirect('/login?status=logout');
    } else {
        res.redirect('/login?status=need')
    }

});

app.get("/dashboard", function(req, res) {
    if (auth.length == 1) {
        res.render('dashboard/home', {
            auth: auth,
            users: users,
            certificates: certificates,
            partners: partners,
            partners_campus: partners_campus,
            programmes: programmes
        });
    } else {
        res.redirect('/login?status=need')
    }

});


app.post("/certificate/add", function(req, res) {
    if (req.body) {
        var certificate = [{
            "title": req.body.title,
            "description": req.body.description,
            "provider": req.body.provider,
            "duree": req.body.duree,
            "conditions": ""
        }];
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("groupe6");
            dbo.collection("certificate").insertMany(certificate, function(err, res) {
                if (err) throw err;
                console.log(res);
                db.close();
            });
            res.redirect('/dashboard');
        });
    }
});

app.post("/certificate/edit/:id", function(req, res) {
    if (req.body) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("groupe6");
            dbo.collection("certificate").updateOne({ _id: new ObjectID(req.params.id) }, { $set: { 'title': req.body.title, 'description': req.body.description, 'provider': req.body.provider, 'duree': req.body.duree } }, { upsert: true }, function(err, res) {
                if (err) throw err;
                console.log("1 document update");
                console.log(res);
                db.close();
            });
            res.redirect('/dashboard?status=done&m=Certificate update');
        });
    }
});


app.post("/certificate/delete/:id", function(req, res) {
    if (req.body) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("groupe6");

            var myquery = { _id: req.params.id };
            dbo.collection("certificate").deleteOne(myquery, function(err, obj) {
                if (err) throw err;
                console.log("1 document deleted", obj);
                db.close();
            });

            console.log(myquery);

            res.redirect('/dashboard?status=done&m=Certificate Delete');
        });
    }
});



app.post("/partners/add", function(req, res) {
    if (req.body) {
        var partners = [{
            "title": req.body.title,
            "description": req.body.description,
            "provider": req.body.provider,
            "link": req.body.link,
            "type": req.body.type,
            "duree": req.body.duree,
            "conditions": ""
        }];
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("groupe6");
            dbo.collection("partner").insertMany(partners, function(err, res) {
                if (err) throw err;
                console.log(res);
                db.close();
            });
            res.redirect('/dashboard');
        });
    }
});

app.post("/partners/edit/:id", function(req, res) {
    if (req.body) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("groupe6");
            dbo.collection("partner").updateOne({ _id: new ObjectID(req.params.id) }, { $set: { 'title': req.body.title, 'description': req.body.description, 'provider': req.body.provider, 'link': req.body.link, 'type': req.body.type, 'duree': req.body.duree } }, { upsert: true }, function(err, res) {
                if (err) throw err;
                console.log("1 document update");
                console.log(res);
                db.close();
            });
            res.redirect('/dashboard?status=done&m=partners update');
        });
    }
});


app.post("/partners/delete/:id", function(req, res) {
    if (req.body) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("groupe6");

            var myquery = { _id: req.params.id };
            dbo.collection("partner").deleteOne(myquery, function(err, obj) {
                if (err) throw err;
                console.log("1 document deleted", obj);
                db.close();
            });

            console.log(myquery);

            res.redirect('/dashboard?status=done&m=partners Delete');
        });
    }
});


app.post("/programmes/add", function(req, res) {
    if (req.body) {
        var programmes = [{
            "title": req.body.title,
            "description": req.body.description,
            "provider": req.body.provider,
            "classe": req.body.classe,
            "conditions": ""
        }];
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("groupe6");
            dbo.collection("programme").insertMany(programmes, function(err, res) {
                if (err) throw err;
                console.log(res);
                db.close();
            });
            res.redirect('/dashboard');
        });
    }
});

app.post("/programmes/edit/:id", function(req, res) {
    if (req.body) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("groupe6");
            dbo.collection("programme").updateOne({ _id: new ObjectID(req.params.id) }, { $set: { 'title': req.body.title, 'description': req.body.description, 'provider': req.body.provider, 'classe': req.body.classe } }, { upsert: true }, function(err, res) {
                if (err) throw err;
                console.log("1 document update");
                console.log(res);
                db.close();
            });
            res.redirect('/dashboard?status=done&m=programmes update');
        });
    }
});


app.post("/programmes/delete/:id", function(req, res) {
    if (req.body) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("groupe6");

            var myquery = { _id: req.params.id };
            dbo.collection("programme").deleteOne(myquery, function(err, obj) {
                if (err) throw err;
                console.log("1 document deleted", obj);
                db.close();
            });

            console.log(myquery);

            res.redirect('/dashboard?status=done&m=programmes Delete');
        });
    }
});


app.post('/addtask', function(req, res) {
    if (req.body.newtask) {
        tasks.push(req.body.newtask);
        res.redirect('/');
    }
});

app.get('/adduser', function(req, res) {
    var tools = require('./connectDB.js');
    tools.init_admin();
    res.redirect('/dashboard');
});

app.post('/removetask', function(req, res) {
    completed.push(req.body.check);
    tasks.pop(req.body.check);
    res.redirect('/');
});

app.listen(4455, function() {
    console.log("Listening on port 4455");
});