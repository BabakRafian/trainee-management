var http = require('http');
var express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017/local';
var ObjectID = require('mongodb').ObjectID;
var cors = require('cors');
var app = express();
var emps = [];

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({extended:true}));

app.route('/employeelist').get((req, res) => {
    MongoClient.connect(dbUrl,{ useNewUrlParser: true}, function(err, db) {
        var collection = db.db().collection('employees');
        if( err ) console.log("Unable connect to database");
        collection.find({}).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            emps = result;
            res.status(200).send(emps);
        });
    });
});

app.route('/employeelist/add').get((req, res) => {
    let newEmp = {firstname: req.query.first, lastname: req.query.last, city: req.query.city, state: req.query.state};
    MongoClient.connect(dbUrl,{ useNewUrlParser: true}, function(err, db) {
        var collection = db.db().collection('employees');
        collection.insertOne(newEmp, function(err, obj) {
            if( err ) console.log("Unable to add employee");
            collection.find({}).toArray(function(err, result) {
                if (err) throw err;
                db.close();
                emps = result;
                res.status(200).send(emps);
            });
        });
    });
});

app.route('/employeelist/delete').get((req, res) => {
    let em = {_id: new ObjectID(req.query._id)};
    MongoClient.connect(dbUrl,{ useNewUrlParser: true}, function(err, db) {
        var collection = db.db().collection('employees');
        collection.deleteOne(em, function(err, obj) {
            if (err) throw err;
            console.log("Employee Deleted");
            collection.find({}).toArray(function(err, result) {
                if (err) throw err;
                db.close();
                emps = result;
                res.status(200).send(emps);
            });
        });
    });
});

app.route('/employeelist/first:name').get((req, res) => {
  let requestedEmpName = req.params['name'];
  requestedEmpName = requestedEmpName.substring(1, requestedEmpName.length);
  res.status(200).send(emps.filter(emp => { return emp.firstname.toLowerCase() == requestedEmpName.toLowerCase() }));
});

app.route('/employeelist/last:name').get((req, res) => {
  let requestedEmpName = req.params['name'];
  requestedEmpName = requestedEmpName.substring(1, requestedEmpName.length);
  res.status(200).send(emps.filter(emp => { return emp.lastname.toLowerCase() == requestedEmpName.toLowerCase() }));
});

app.route('/employeelist/city:name').get((req, res) => {
  let requestedEmpName = req.params['name'];
  requestedEmpName = requestedEmpName.substring(1, requestedEmpName.length);
  res.status(200).send(emps.filter(emp => { return emp.city.toLowerCase() == requestedEmpName.toLowerCase() }));
});

app.route('/employeelist/state:name').get((req, res) => {
  let requestedEmpName = req.params['name'];
  requestedEmpName = requestedEmpName.substring(1, requestedEmpName.length);
  res.status(200).send(emps.filter(emp => { return emp.state.toLowerCase() == requestedEmpName.toLowerCase() }));
});

app.route('/employeelist/all').get((req, res) => {
  let first = req.query.first;
  let last = req.query.last;
  let city = req.query.city;
  let state = req.query.state;
  res.status(200).send(emps.filter(emp => { return emp.firstname.toLowerCase() == first.toLowerCase() &&
                                                    emp.lastname.toLowerCase() == last.toLowerCase() &&
                                                    emp.city.toLowerCase() == city.toLowerCase() &&
                                                    emp.state.toLowerCase() == state.toLowerCase()}));
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening on %s:%s', host, port);
});