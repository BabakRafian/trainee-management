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
 * @returns JSON object of the all documents in the collection
 * 
 */
    public getAllDocumentsFrom(collectionName:string, cb:(res: any[])=>any){
        
        let URL = this.baseURL + collectionName;
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
    /**
     * Adds a new entry to the given collection name
     * @param collectionName 
     * @param document 
     * @param cb 
     * @returns body of the message from db service
     */
    public insertOne(collectionName:string, document: any, cb:(res: any)=>any){
        var options = { method: 'POST',
        url: 'https://tmdatabase-864c.restdb.io/rest/' + collectionName,
        headers: 
            {   'cache-control': 'no-cache',
                'x-apikey': this.apiKey,
                'content-type': 'application/json' },
        body: document,
        json: true };

        request(options, function (error, response, body) {
        if (error) throw new Error(error);
        cb(body);
        //console.log(body);
        });
    }
/**
 * Deletes one document from the collection
 *  
 * @param collectionName 
 * @param document_id 
 * @param cb 
 * @returns deleted documents _id
 */
    public deleteOne(collectionName:string, document_id:string, cb:(res: any)=>any){
        var options = { method: 'DELETE',
        url: 'https://tmdatabase-864c.restdb.io/rest/'+ collectionName + '/' + document_id,
        headers: 
            { 'cache-control': 'no-cache',
              'x-apikey': this.apiKey,
              'content-type': 'application/json' } };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            cb(body);
            //console.log(body);
        });
    }

/**
 * Queries the collection
 * @param collectionName 
 * @param query 
 * @param cb 
 */
    public find(collectionName:string, query:string, cb:(res: any)=>any){
        let URL = this.baseURL + collectionName + '?q=' + query;
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


}