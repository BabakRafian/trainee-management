import express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
import { DBUtility } from './dbUtility';
var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017/trainee-management';

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8080);
app.use(express.json());
console.log('listening to localhost://8080');

/**
 * Validates the user
 * @param username
 * @param pass
 */
function isValid_old(username, pass, cb:(res: any)=>any) {
    let db = new DBUtility();
    let query = '{"trainee_id" : "'+username+'", "password": "'+pass+'"}';
    console.log(query);
    db.find('trainees',query,(body:any[])=>{
        
        let temp:boolean = body.length > 0;
        console.log(temp);
        cb(temp);
    });
}
/**
 * Validates the user
 * @param username
 * @param pass
 */
function isValid(username, pass, cb:(res: any)=>any) {
    MongoClient.connect(dbUrl,{ useNewUrlParser: true}, function(err, db) {
        if( err ) console.log("Unable connect to database");
        var myCursor = db.db().collection('trainees');
        myCursor.find( { "trainee_id": username, "password":pass } ).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            console.log(result);
            cb(result.length>0);
        });
    });
}

/**
 * handles login requests
 */
app.post('/login', function (request, response) {
    console.log("Hello from post");
    console.log(request.body);
    
    isValid(request.body.username, request.body.password,(res:any)=>{
        if (res) {
            //console.log('I am true');
            response.status(200).send({ status: true });
        }
        else {
            response.status(200).send({ status: false });
        }
    });
});