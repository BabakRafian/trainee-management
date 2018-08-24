import { DBUtility } from './dbUtility';
import{Batch} from './models/batch';
import { Trainee } from './models/trainee';
import {City} from "./models/city";
//var DBUtility = require('./dbUtility');

let db = new DBUtility();
let city_pref:City={
    state: "New York",
    city:"New Jersey"
}

let tr1: Trainee = {
    trainee_id: 234,
    email: "test@na.com",
    first_name: "Heli",
    last_name: "meli",
    batch_id: "1",
    password: "1234",
    city_preferences: [city_pref],
    domain_preferences: ["Full-Stack"]
}
// db.getAllRecordsFrom('batches',(body: any[])=>{
//     //console.log(body[0]);
// });

// db.getAllRecordsFrom('trainees',(body: any[])=>{
//     console.log(body[0]);
// });

db.addNewDocument(tr1,(body:any[])=>{
    console.log(body);
});