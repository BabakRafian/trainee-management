"use strict";
exports.__esModule = true;
// import { DBUtility } from './dbUtility';
// import{Batch} from './models/batch';
// import { Trainee } from './models/trainee';
// import {City} from "./models/city";
//var DBUtility = require('./dbUtility');
var express = require("express");
var app = express();
app.listen(8080);
app.use(express.json());
//let db = new DBUtility();
// let city_pref:City={
//     state: "New York",
//     city:"New Jersey"
// }
// let tr1: Trainee = {
//     trainee_id: 234,
//     email: "test@na.com",
//     first_name: "Heli",
//     last_name: "meli",
//     batch_id: "1",
//     password: "1234",
//     city_preferences: [city_pref],
//     domain_preferences: ["Full-Stack"]
// }
// db.getAllRecordsFrom('batches',(body: any[])=>{
//     //console.log(body[0]);
// });
// db.getAllRecordsFrom('trainees',(body: any[])=>{
//     console.log(body[0]);
// });
// let collectionName = 'trainees';
// let query = '{"first_name":"Heli"}'
// db.find(collectionName,query,(body:any[])=>{
//     console.log(body[0]._id);
//     db.deleteOne(collectionName,body[0]._id,(body:any)=>{
//         console.log(body);
//     });
// });
function isValid(username, pass) {
    console.log(username + ' ' + pass);
    if (username === "babak" && pass == 4070) {
        return true;
    }
    else {
        return false;
    }
}
app.post('/login', function (request, response) {
    console.log("Hello from post");
    console.log(request.body);
    var res = [{ status: true }, { status: false }];
    if (isValid(request.body.username, request.body.password)) {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
        response.header("Access-Control-Allow-Methods", "GET, PUT, POST");
        response.status(200).send(res[0]);
    }
    else {
        //response.send(request.body.pass);
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
        response.header("Access-Control-Allow-Methods", "GET, PUT, POST");
        response.status(200).send(res[1]);
    }
});
