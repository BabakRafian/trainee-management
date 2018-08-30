var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017/trainee-management';
var ObjectID = require('mongodb').ObjectID;
var cors = require('cors');
var app = express();
var trainees = [];
var tasks = [];
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
/*
*   CWM
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
*   CWM
*   Returns the full list of trainees in the batch specified. This will be called when the page
*   initially loads.
*/
app.route('/traineelist/batch').get(function (req, res) {
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        var collection = db.db().collection('batches');
        if (err)
            console.log("Unable connect to database");
        collection.find({ "batch_id": req.query.batch_id }, { "trainees": 1, "_id": 0 }).forEach(function (element) {
            trainees = element.trainees;
        }, function (err) {
            db.close();
            res.status(200).send(trainees);
        });
    });
});
/*
*   CWM
*   This code will need to be "re-routed" or changed altogether since there is no longer
*   any functionality for adding a trainee from the traineelist page (search trainee page).
*   Most likely the best bet will be to send a whole json array of trainees (when a batch is
*   created) and to use the insertMany mongodb method to add all of the trainees at once to
*   the trainee collection
*/
// app.route('/traineelist/add').get((req, res) => {
//     let newEmp = {trainee_id: req.query.trainee_id, email: req.query.email, first_name: req.query.first, last_name: req.query.last, batch_id: req.query.batch_id};
//     MongoClient.connect(dbUrl,{ useNewUrlParser: true}, function(err, db) {
//         var collection = db.db().collection('trainees');
//         collection.insertOne(newEmp, function(err, obj) {
//             if( err ) console.log("Unable to add trainee");
//             collection.find({}).toArray(function(err, result) {
//                 if (err) throw err;
//                 db.close();
//                 trainees = result;
//                 res.status(200).send(trainees);
//             });
//         });
//     });
// });
/*
*   CWM
*   Queries the trainee collection for any trainee with the specified trainee_id.
*   Uses the deleteOne mongodb method because only one trainee will have that trainee_id.
*   Then returns the trainees still in the collection.
*/
app.route('/traineelist/delete').get(function (req, res) {
    var em = { trainee_id: req.query.trainee_id };
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        var batchesCollection = db.db().collection('batches');
        //$pull gets rid of the element in the specified array by the trainee_id specified
        batchesCollection.updateOne({ "batch_id": req.query.batch_id }, { $pull: { "trainees": { trainee_id: req.query.trainee_id } } });
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
*   CWM
*   Queries the trainee collection for any trainee with the specified trainee_id.
*   Uses the deleteOne mongodb method because only one trainee will have that trainee_id.
*   Then returns the trainees still in the collection.
*/
app.route('/traineelist/batch/delete').get(function (req, res) {
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        var collection = db.db().collection('trainees');
        collection.deleteOne({ "trainee_id": req.query.trainee_id }, function (err, obj) {
            if (err)
                throw err;
            console.log("Trainee Deleted");
        });
        var batchesCollection = db.db().collection('batches');
        batchesCollection.updateOne({ "batch_id": req.query.batch_id }, { $pull: { "trainees": { trainee_id: req.query.trainee_id } } }, function (err, obj) {
            batchesCollection.find({ "batch_id": req.query.batch_id }, { "trainees": 1, "_id": 0 }).forEach(function (element) {
                trainees = element.trainees;
                console.log(trainees);
                res.status(200).send(trainees); //Sends back trainees specific to that batch being viewed
            });
        });
    });
});
/*
*   CWM
*   This query will return the trainee based on all of the fields being specified, just
*   the trainee_id or email fields being specified (which will be unique), or if the search
*   include the first_name, last_name, and batch_id fields. We do not want to include a general search
*   for batch_id to match on because then if the trainee_id field was given a value and the batch_id field
*   was given a value, it would still return everyone in that batch even though they would have different
*   trainee ID's
*/
app.route('/traineelist/search').get(function (req, res) {
    var t_id = req.query.trainee_id;
    var em = req.query.email;
    var first = req.query.first_name;
    var last = req.query.last_name;
    var b_id = req.query.batch_id;
    var query = { "$or": [{ "trainee_id": t_id, "email": em, "first_name": first, "last_name": last, "batch_id": b_id },
            { "trainee_id": t_id }, { "email": em }, { "$and": [{ "first_name": first }, { "last_name": last }, { "batch_id": b_id }] }] };
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
/*
*   CWM
*   Queries the tasks collection for all of the tasks. Used when initially loading the page
*/
app.route('/tasklist').get(function (req, res) {
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        var collection = db.db().collection('tasks');
        if (err)
            console.log("Unable connect to database");
        collection.find({}).toArray(function (err, result) {
            if (err)
                throw err;
            db.close();
            tasks = result;
            res.status(200).send(tasks); //Sends back all tasks in the general tasks collection
        });
    });
});
/*
*   CWM
*   Queries the tasks collection for all of the tasks specific to a batch
*/
app.route('/tasklist/batch').get(function (req, res) {
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        var collection = db.db().collection('batches');
        if (err)
            console.log("Unable connect to database");
        collection.find({ "batch_id": req.query.batch_id }, { "tasks": 1, "_id": 0 }).forEach(function (element) {
            tasks = element.tasks;
        }, function (err) {
            db.close();
            res.status(200).send(tasks); //Sends back all tasks specific to the batch being viewed
        });
    });
});
/*
*   CWM
*   Mapped to from the general tasks page. Adds a task to the tasks collecton as well as
*   the specific batch if specified, but returns the general tasks to repopulate the tasks list
*/
app.route('/tasklist/addtask').get(function (req, res) {
    var newTask = { "task_id": req.query.task_id, "course_id": req.query.course_id, "task_description": req.query.task_description };
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        var batchesCollection = db.db().collection('batches');
        batchesCollection.updateOne({ batch_id: req.query.batch_id }, { $push: //Push is the mongodb command to add an object to an array
            { tasks: { task_id: req.query.task_id,
                    course_id: req.query.course_id,
                    task_description: req.query.task_description,
                    deadline: req.query.deadline } } });
        var collection = db.db().collection('tasks');
        collection.insertOne(newTask, function (err, obj) {
            if (err)
                console.log("Unable to add task");
            collection.find({}).toArray(function (err, result) {
                if (err)
                    throw err;
                db.close();
                tasks = result;
                res.status(200).send(tasks); //Sends back all tasks for the general view tasks page
            });
        });
    });
});
/*
*   CWM
*   First adds a task to the tasks collection. Then it goes into the batches collection and updates the proper batch document
*   by pushing the new assigned task onto it. Returns the tasks specific to this batch to
*   repopulate the batch's tasks list
*/
app.route('/tasklist/batch/addtask').get(function (req, res) {
    var newTask = { "task_id": req.query.task_id, "course_id": req.query.course_id, "task_description": req.query.task_description };
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        var collection = db.db().collection('tasks');
        collection.insertOne(newTask, function (err, obj) {
            if (err)
                console.log("Unable to add task");
        });
        var batchesCollection = db.db().collection('batches');
        batchesCollection.updateOne({ batch_id: req.query.batch_id }, { $push: //Push is the mongodb command to add an object to an array
            { tasks: { task_id: req.query.task_id,
                    course_id: req.query.course_id,
                    task_description: req.query.task_description,
                    deadline: req.query.deadline } } }, function (err, obj) {
            if (err)
                console.log("Unable to add task");
            batchesCollection.find({ "batch_id": req.query.batch_id }, { "tasks": 1, "_id": 0, "tasks.deadline": 0 }).forEach(function (element) {
                tasks = element.tasks;
            }, function (err) {
                db.close();
                res.status(200).send(tasks); //Sends back tasks specific to batch
            });
        });
    });
});
/*
*   CWM
*   Queries the tasks collection for any task with the specified task_id.
*   Uses the deleteOne mongodb method because only one task will have that task_id.
*   Then returns the tasks still in the collection.
*/
app.route('/tasklist/deletetask').get(function (req, res) {
    var delTask = { task_id: req.query.task_id };
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        var batchesCollection = db.db().collection('batches');
        batchesCollection.updateMany({}, { $pull: { "tasks": { task_id: req.query.task_id } } }); //Deletes task from all batches tasks array
        var collection = db.db().collection('tasks');
        collection.deleteOne(delTask, function (err, obj) {
            if (err)
                throw err;
            console.log("Task Deleted");
            collection.find({}).toArray(function (err, result) {
                if (err)
                    throw err;
                db.close();
                tasks = result;
                res.status(200).send(tasks); //This sends back all of the tasks for the general tasks page
            });
        });
    });
});
/*
*   Deletes the task for the specific batch then returns that batches tasks to repopulate the
*   tasks list on the view batch page.
*/
app.route('/tasklist/batch/deletetask').get(function (req, res) {
    var delTask = { task_id: req.query.task_id };
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        var collection = db.db().collection('tasks');
        collection.deleteOne(delTask, function (err, obj) {
            if (err)
                throw err;
            console.log("Task Deleted");
        });
        var batchesCollection = db.db().collection('batches');
        //Only use updateOne and specify a batch to delete from. Deleting a task from the batch view should only delete it from that batch
        batchesCollection.updateOne({ "batch_id": req.query.batch_id }, { $pull: { "tasks": { task_id: req.query.task_id } } }, function (err, obj) {
            if (err)
                console.log("Unable to add task");
            batchesCollection.find({ "batch_id": req.query.batch_id }, { "tasks": 1, "_id": 0, "tasks.deadline": 0 }).forEach(function (element) {
                tasks = element.tasks;
            }, function (err) {
                db.close();
                res.status(200).send(tasks); //This sends back the tasks for the specific batch
            });
        });
    });
});
/**
 * Validates the user
 * @param username
 * @param pass
 */
function isValid(username, pass, cb) {
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        if (err)
            console.log("Unable connect to database");
        var myCursor = db.db().collection('trainees');
        myCursor.find({ "trainee_id": username, "password": pass }).toArray(function (err, result) {
            if (err)
                throw err;
            db.close();
            console.log(result);
            cb(result.length > 0);
        });
    });
}
/**
 * handles login requests
 */
app.post('/login', function (request, response) {
    console.log("Hello from post");
    console.log(request.body);
    isValid(request.body.username, request.body.password, function (res) {
        if (res) {
            //console.log('I am true');
            response.status(200).send({ status: true });
        }
        else {
            response.status(200).send({ status: false });
        }
    });
});
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening on %s:%s', host, port);
});
