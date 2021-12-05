const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./models/userModel')
const routes = require('./routes/route.js');
 
require("dotenv").config({
    path: path.join(__dirname, "../.env")
});
 
const app = express();
 
const PORT = process.env.PORT || 3000;
 
mongoose
.connect('mongodb://localhost:27017/rbac')
.then(() => {
console.log("Connection à la Base de données réussi ");
});

app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
        const accessToken = req.headers["x-access-token"];
        const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
        // Check if token has expired
        if (exp < Date.now().valueOf() / 1000) { 
            return res.status(401).json({ error: "Le jeton JWT a expiré, veuillez vous connecter pour en obtenir un nouveau"});
        } 
        res.locals.loggedInUser = await User.findById(userId); next(); 
    } else { 
    next(); 
    } 
});
 
app.use('/', routes); app.listen(PORT, () => {
  console.log('Le server écoute sur le Port:', PORT)
})










