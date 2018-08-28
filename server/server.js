"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var dbUtility_1 = require("./dbUtility");
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8080);
app.use(express.json());
/**
 * Validates the user
 * @param username
 * @param pass
 */
function isValid(username, pass, cb) {
    var db = new dbUtility_1.DBUtility();
    var query = '{"trainee_id" : "' + username + '", "password": "' + pass + '"}';
    console.log(query);
    db.find('trainees', query, function (body) {
        var temp = body.length > 0;
        console.log(temp);
        cb(temp);
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
