"use strict";
exports.__esModule = true;
var dbUtility_1 = require("./dbUtility");
//var DBUtility = require('./dbUtility');
var db = new dbUtility_1.DBUtility();
var tr1 = {
    trainee_id: "234",
    email: "test@na.com",
    firstname: "Heli",
    lastname: "meli",
    batch_id: "1",
    password: "1234",
    city_preferences: ["newJersy"],
    domain_preferences: ["Full-Stack"]
};
// db.getAllRecordsFrom('batches',(body: any[])=>{
//     //console.log(body[0]);
// });
// db.getAllRecordsFrom('trainees',(body: any[])=>{
//     console.log(body[0]);
// });
db.addNewDocument(tr1, function (body) {
    console.log(body);
});
