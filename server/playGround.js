"use strict";
exports.__esModule = true;
var dbUtility_1 = require("./dbUtility");
//var DBUtility = require('./dbUtility');
var db = new dbUtility_1.DBUtility();
var city_pref = {
    state: "New York",
    city: "New Jersey"
};
var tr1 = {
    trainee_id: 234,
    email: "test@na.com",
    first_name: "Heli",
    last_name: "meli",
    batch_id: "1",
    password: "1234",
    city_preferences: [city_pref],
    domain_preferences: ["Full-Stack"]
};
// db.getAllRecordsFrom('batches',(body: any[])=>{
//     //console.log(body[0]);
// });
// db.getAllRecordsFrom('trainees',(body: any[])=>{
//     console.log(body[0]);
// });
var collectionName = 'trainees';
var query = '{"first_name":"someone"}';
db.find(collectionName, query, function (body) {
    console.log(body[0]._id);
    db.deleteOne(collectionName, body[0]._id, function (body) {
        console.log(body);
    });
});
