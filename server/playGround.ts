// import { DBUtility } from './dbUtility';
// import{Batch} from './models/batch';
// import { Trainee } from './models/trainee';
// import {City} from "./models/city";
//var DBUtility = require('./dbUtility');
import express = require('express');
let app = express();
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
