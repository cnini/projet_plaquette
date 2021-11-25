var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

module.exports = {
  init_admin: function () {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("groupe6");    
      var users_admin = [
        {
          "id": "0",
          "name":"groupe6",
          "pass":"groupe6",
          "mail":"groupe6@estiam.com",
          "tel": 445566778899,
          "address": "Paris, France",
          "type": "admin",
          "status":"1",
          "roles":[
            "1",
            "2"
          ]
        },
        {
          "id": "1",
          "name":"manuel",
          "pass":"manuel",
          "mail":"manuel@estiam.com",
          "tel": 123456789,
          "address": "Paris, France",
          "type": "admit_3e annee",
          "status":"1",
          "roles":[
            "3",
            "4"
          ]
        }	 
      ];
      dbo.collection("users").insertMany(users_admin, function(err, res) {
        if (err) throw err;
        console.log(res);
        db.close();
      });
      /*dbo.collection("dassi").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });*/
    });
  }
};
