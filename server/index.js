var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017/local';
var ObjectID = require('mongodb').ObjectID;
var cors = require('cors');
var app = express();
var trainees = [];
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
/*
*   Returns the full list of trainees in the collection. This will be called when the page
*   initially loads.
*/
app.route('/traineelist').get(function (req, res) {
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        var collection = db.db().collection('trainees');
        if (err)
            console.log("Unable connect to database");
        collection.find({}).toArray(function (err, result) {
            if (err)
                throw err;
            db.close();
            trainees = result;
            res.status(200).send(trainees);
        });
    });
});
/*
*   This code will need to be "re-routed" or changed altogether since there is no longer
*   any functionality for adding a trainee from the traineelist page (search trainee page).
*   Most likely the best bet will be to send a whole json array of trainees (when a batch is
*   created) and to use the insertMany mongodb method to add all of the trainees at once to
*   the trainee collection
*/
app.route('/traineelist/add').get(function (req, res) {
    var newEmp = { trainee_id: req.query.trainee_id, email: req.query.email, firstname: req.query.first, lastname: req.query.last, batch_id: req.query.batch_id };
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        var collection = db.db().collection('trainees');
        collection.insertOne(newEmp, function (err, obj) {
            if (err)
                console.log("Unable to add trainee");
            collection.find({}).toArray(function (err, result) {
                if (err)
                    throw err;
                db.close();
                trainees = result;
                res.status(200).send(trainees);
            });
        });
    });
});
/*
*   Queries the trainee collection for any trainee with the specified trainee_id.
*   Uses the deleteOne mongodb method because only one trainee will have that trainee_id.
*   Then returns the trainees still in the collection.
*/
app.route('/traineelist/delete').get(function (req, res) {
    var em = { trainee_id: req.query.trainee_id };
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        var collection = db.db().collection('trainees');
        collection.deleteOne(em, function (err, obj) {
            if (err)
                throw err;
            console.log("Trainee Deleted");
            collection.find({}).toArray(function (err, result) {
                if (err)
                    throw err;
                db.close();
                trainees = result;
                res.status(200).send(trainees);
            });
        });
    });
});
/*
*   This query will return the trainee based on all of the fields being specified, just
*   the trainee_id or email fields being specified (which will be unique), or if the search
*   include the firstname, lastname, and batch_id fields. We do not want to include a general search
*   for batch_id to match on because then if the trainee_id field was given a value and the batch_id field
*   was given a value, it would still return everyone in that batch even though they would have different
*   trainee ID's
*/
app.route('/traineelist/search').get(function (req, res) {
    var t_id = req.query.trainee_id;
    var em = req.query.email;
    var first = req.query.firstname;
    var last = req.query.lastname;
    var b_id = req.query.batch_id;
    var query = { "$or": [{ "trainee_id": t_id, "email": em, "firstname": first, "lastname": last, "batch_id": b_id },
            { "trainee_id": t_id }, { "email": em }, { "$and": [{ "firstname": first }, { "lastname": last }, { "batch_id": b_id }] }] };
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        var collection = db.db().collection('trainees');
        if (err)
            console.log("Unable connect to database");
        collection.find(query).toArray(function (err, result) {
            if (err)
                throw err;
            db.close();
            trainees = result;
            res.status(200).send(trainees);
        });
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening on %s:%s', host, port);
});
