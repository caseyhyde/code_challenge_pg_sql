var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = "postgres://localhost:5432/sigma";

router.get('/', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("Could not connect to the database to get treats");
      res.sendStatus(500);
    }
    client.query('SELECT * FROM treats', function(err, result) {
      done();
      if(err) {
        console.log("Query error getting treats");
        res.sendStatus(500);
      }
      res.send(result.rows);
    });//end query
  });//end connect
});//end route

router.post('/', function(req, res) {
  var treat = req.body;
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("Could not connect to database to post new treat");
      res.sendStatus(500);
    }
    client.query('INSERT INTO treats (name, description, pic) VALUES ($1, $2, $3)',
    [treat.name, treat.description, treat.url], function(err, result) {
      done();
      if(err) {
        console.log("Query error adding new treat to database");
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });//end query
  });//end connect
});//end route
router.get('/:query', function(req, res) { //search route
  var query = "%" + req.params.query + "%";
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("Could not connect to the database to get treats");
      res.sendStatus(500);
    }
    client.query('SELECT * FROM treats WHERE name ILIKE ($1)', [query], function(err, result) {
      done();
      if(err) {
        console.log("Query error getting treats");
        res.sendStatus(500);
      }
      res.send(result.rows);
    });//end query
  });//end connect
});//end route
router.put('/:treatid', function(req, res) { //search route
  var treatId = req.params.treatid;
  console.log(treatId);
  var treatUpdate = req.body;
  console.log("update field: ", treatUpdate.updateField);
  console.log("update text: ", treatUpdate.updateText);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("Could not connect to the database to get treats");
      res.sendStatus(500);
    }
    if (treatUpdate.updateField == "name") {
      client.query('UPDATE treats SET name=$1 WHERE id=$2',
      [treatUpdate.updateText, treatId],
      function(err, result) {
        if(err) {
          console.log("Query error updating treats");
          res.sendStatus(500);
        }
        res.sendStatus(200);
      });//end query
    } else if (treatUpdate.updateField == "description") {
      client.query('UPDATE treats SET description=$1 WHERE id=$2',
      [treatUpdate.updateText, treatId],
      function(err, result) {
        if(err) {
          console.log("Query error updating treats");
          res.sendStatus(500);
        }
        res.sendStatus(200);
      });//end query
    }
  });//end connect
});//end route


module.exports = router;
