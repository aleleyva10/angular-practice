// requires
var express = require('express');
var app = express();
var index = require('./modules/routes/index');
var tasks = require('./modules/routes/tasks');


// uses
app.use(express.static('public'));
app.use('/', index);
app.use('/tasks', tasks);


// globals
var port = process.env.PORT || 3000;

// spin up server
app.listen(port, function() {
  console.log('Listening on:', port);
}); // end spin up
