
// Dependencies
const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const path          = require('path');

// Database dependencies
const mongoose      = require('mongoose');
const secret        = require('./server/config');
mongoose.Promise    = global.Promise;

// Connect to MongoDB Database
mongoose.connect(secret.db, {
  useMongoClient: true
}, function(err){
    if(err){
        console.error("Error! "+err);
        process.exit(1);
    }
});

// Parsing the text as urlEncoded data and then parse as json
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Route for controllers
app.use('/api',         require('./server/routes/api'));
app.use('/userdata',    require('./server/routes/userdata'));
app.use('/usercard',    require('./server/routes/usercard'));
app.use('/crypt',       require('./server/routes/crypt'));

// Folder where all angular code is stored
app.use(express.static(path.join(__dirname,'dist')));
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'dist/index.html'));
});

// START SERVER
const port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log("Server running on localhost: "+port);
});

// To keep Heroku instance alive
const http = require("http");
setInterval(function() {
    http.get("http://pwdlock.herokuapp.com");
}, 1500000); // every 25 minutes (1500000)