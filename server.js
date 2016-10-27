// setup express.
// require modules
var express = require('express');
var firebase = require("firebase"); 
var app = express();  // create instance of express.

// Serve Static files:
app.use(express.static('public'));

// ADD IN ROUTES
// ====================================================================
app.get('/', function (req, res) {
  res.send('Hello World!');
});


// Listening on Port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
