// requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

var 

// uses
app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));


// globals
var port = process.env.PORT || 3000;

// spin up server
app.listen(port, function() {
  console.log('Listening on:', port);
}); // end spin up
