var http = require('http');
var express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017/local';
var ObjectID = require('mongodb').ObjectID;
var cors = require('cors');
var app = express();
var trainees = [];

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({extended:true}));

app.route('/traineelist').get((req, res) => {
    MongoClient.connect(dbUrl,{ useNewUrlParser: true}, function(err, db) {
        var collection = db.db().collection('trainees');
        if( err ) console.log("Unable connect to database");
        collection.find({}).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            trainees = result;
            res.status(200).send(trainees);
        });
    });
});

app.route('/traineelist/add').get((req, res) => {
    let newEmp = {trainee_id: req.query.trainee_id, email: req.query.email, firstname: req.query.first, lastname: req.query.last, batch_id: req.query.batch_id};
    MongoClient.connect(dbUrl,{ useNewUrlParser: true}, function(err, db) {
        var collection = db.db().collection('trainees');
        collection.insertOne(newEmp, function(err, obj) {
            if( err ) console.log("Unable to add trainee");
            collection.find({}).toArray(function(err, result) {
                if (err) throw err;
                db.close();
                trainees = result;
                res.status(200).send(trainees);
            });
        });
    });
});

app.route('/traineelist/delete').get((req, res) => {
    let em = {trainee_id: req.query.trainee_id};
    MongoClient.connect(dbUrl,{ useNewUrlParser: true}, function(err, db) {
        var collection = db.db().collection('trainees');
        collection.deleteOne(em, function(err, obj) {
            if (err) throw err;
            console.log("Trainee Deleted");
            collection.find({}).toArray(function(err, result) {
                if (err) throw err;
                db.close();
                trainees = result;
                res.status(200).send(trainees);
            });
        });
    });
});

app.route('/traineelist/id:name').get((req, res) => {
  let requestedEmpName = req.params['name'];
  requestedEmpName = requestedEmpName.substring(1, requestedEmpName.length);
  res.status(200).send(trainees.filter(emp => { return emp.trainee_id == requestedEmpName }));
});

app.route('/traineelist/email:name').get((req, res) => {
  let requestedEmpName = req.params['name'];
  requestedEmpName = requestedEmpName.substring(1, requestedEmpName.length);
  res.status(200).send(trainees.filter(emp => { return emp.email.toLowerCase() == requestedEmpName.toLowerCase() }));
});

app.route('/traineelist/first:name').get((req, res) => {
  let requestedEmpName = req.params['name'];
  requestedEmpName = requestedEmpName.substring(1, requestedEmpName.length);
  res.status(200).send(trainees.filter(emp => { return emp.firstname.toLowerCase() == requestedEmpName.toLowerCase() }));
});

app.route('/traineelist/last:name').get((req, res) => {
  let requestedEmpName = req.params['name'];
  requestedEmpName = requestedEmpName.substring(1, requestedEmpName.length);
  res.status(200).send(trainees.filter(emp => { return emp.lastname.toLowerCase() == requestedEmpName.toLowerCase() }));
});

app.route('/traineelist/batch:name').get((req, res) => {
  let requestedEmpName = req.params['name'];
  requestedEmpName = requestedEmpName.substring(1, requestedEmpName.length);
  res.status(200).send(trainees.filter(emp => { return emp.batch_id.toLowerCase() == requestedEmpName.toLowerCase() }));
});

app.route('/traineelist/all').get((req, res) => {
    let t_id = req.query.trainee_id;
    let em = req.query.email;
    let first = req.query.firstname;
    let last = req.query.last;
    let b_id = req.query.batch_id;
    let query = {trainee_id: t_id, email: em, firstname: first, lastname: last, batch_id: b_id};
  res.status(200).send(trainees.filter(emp => { return emp.trainee_id == t_id &&
                                                    emp.email.toLowerCase() == em.toLowerCase() &&
                                                    emp.firstname.toLowerCase() == first.toLowerCase() &&
                                                    emp.lastname.toLowerCase() == last.toLowerCase() &&
                                                    emp.batch_id.toLowerCase() == b_id.toLowerCase()}));
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening on %s:%s', host, port);
});