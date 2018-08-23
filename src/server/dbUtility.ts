import { Batch } from "./models/batch";
import { Trainee }from "./models/trainee";
var request = require("request");

export class DBUtility{

    baseURL: string;
    apiKey : string;

    constructor(baseURL = 'https://tmdatabase-864c.restdb.io/rest/' 
                , apiKey = '369d82557cfeecc580923e9e1788e3444271f'){
        this.baseURL = baseURL;
        this.apiKey = apiKey;
    }
/**
 * GET all documents from the collection
 * @param collectionName 
 * @param cb 
 */
    public getAllRecordsFrom(collectionName:string, cb:(res: any[])=>any){
        let URL = this.baseURL + collectionName;

        console.log(URL);
        var options = { method: 'GET',
        url: URL,
        headers: 
            { 'cache-control': 'no-cache',
                'x-apikey': this.apiKey } };

        request(options, function (error, res, body) {
            if (error) throw new Error(error);
            cb(JSON.parse(body));
            
        })
    }

    public addNewDocument(document: any, cb:(res: any[])=>any){
        var options = { method: 'POST',
        url: 'https://tmdatabase-864c.restdb.io/rest/trainees',
        headers: 
            {   'cache-control': 'no-cache',
                'x-apikey': '369d82557cfeecc580923e9e1788e3444271f',
                'content-type': 'application/json' },
        body: document,
        json: true };

        request(options, function (error, response, body) {
        if (error) throw new Error(error);
        cb(JSON.parse(body));
        console.log(body);
        });
    }


}