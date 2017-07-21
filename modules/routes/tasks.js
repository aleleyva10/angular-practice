var express = require('express');
var router = express.Router();
var pg = require('pg');
var bodyParser = require('body-parser');

var config = {
  database: 'omega',
  host: 'localhost',
  port: 5432, // default port for postico
  max: 20
};

router.use( bodyParser.urlencoded( { extended: true } ) );
router.use( bodyParser.json() );

var pool = new pg.Pool(config);


// POST /todos
router.post('/', function(req, res) {
  var task = req.body; // data from the client
  console.log(req.body);

  // do database query to make a new task
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }
      client.query('INSERT INTO task (description) VALUES($1)', [task.task])
        .then(function() {
          done();
          res.sendStatus(201); // created
        })
    .catch(function(err) {
      console.log(err);
      client.release();
      res.sendStatus(500); // server error
    });
  });
});

//get /tasks
router.get('/', function(req, res) {
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }
    client.query('SELECT * FROM task', function(err, task) {
      done();
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;

      }
      console.log('Got rows from the DB', task.rows);
      res.send(task.rows);
    });
  });
});

router.put('/:id', function(req, res) {
  var completed = req.body;
  console.log('received completed from client', completed);

  var id = req.params.id;

  pool.connect()
    .then(function(client) {
      client.query('UPDATE task ' +
          'SET completed = $1 ' +
          'WHERE id = $2', [completed.completed, id])
        .then(function() {
          client.release();
          res.sendStatus(204); // something good
        });
    })
    .catch(function(err) {
      client.release();
      res.sendStatus(500); // server error
    });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;

  pool.connect()
    .then(function(client) {
      client.query('DELETE FROM task ' +
          'WHERE id = $1', [id])
        .then(function() {
          client.release();
          res.sendStatus(204); // something good
        });
    })
    .catch(function(err) {
      client.release();
      res.sendStatus(500); // server error
    });
});

module.exports = router;
