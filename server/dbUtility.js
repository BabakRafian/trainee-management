"use strict";
exports.__esModule = true;
var request = require("request");
var DBUtility = /** @class */ (function () {
    function DBUtility(baseURL, apiKey) {
        if (baseURL === void 0) { baseURL = 'https://tmdatabase-864c.restdb.io/rest/'; }
        if (apiKey === void 0) { apiKey = '369d82557cfeecc580923e9e1788e3444271f'; }
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
    DBUtility.prototype.getAllDocumentsFrom = function (collectionName, cb) {
        var URL = this.baseURL + collectionName;
        var options = { method: 'GET',
            url: URL,
            headers: { 'cache-control': 'no-cache',
                'x-apikey': this.apiKey } };
        request(options, function (error, res, body) {
            if (error)
                throw new Error(error);
            cb(JSON.parse(body));
        });
    };
    /**
     * Adds a new entry to the given collection name
     * @param collectionName
     * @param document
     * @param cb
     * @returns body of the message from db service
     */
    DBUtility.prototype.insertOne = function (collectionName, document, cb) {
        var options = { method: 'POST',
            url: 'https://tmdatabase-864c.restdb.io/rest/' + collectionName,
            headers: { 'cache-control': 'no-cache',
                'x-apikey': this.apiKey,
                'content-type': 'application/json' },
            body: document,
            json: true };
        request(options, function (error, response, body) {
            if (error)
                throw new Error(error);
            cb(body);
            //console.log(body);
        });
    };
    /**
     * Deletes one document from the collection
     *
     * @param collectionName
     * @param document_id
     * @param cb
     * @returns deleted documents _id
     */
    DBUtility.prototype.deleteOne = function (collectionName, document_id, cb) {
        var options = { method: 'DELETE',
            url: 'https://tmdatabase-864c.restdb.io/rest/' + collectionName + '/' + document_id,
            headers: { 'cache-control': 'no-cache',
                'x-apikey': this.apiKey,
                'content-type': 'application/json' } };
        request(options, function (error, response, body) {
            if (error)
                throw new Error(error);
            cb(body);
            //console.log(body);
        });
    };
    /**
     * Queries the collection
     * @param collectionName
     * @param query
     * @param cb
     */
    DBUtility.prototype.find = function (collectionName, query, cb) {
        var URL = this.baseURL + collectionName + '?q=' + query;
        var options = { method: 'GET',
            url: URL,
            headers: { 'cache-control': 'no-cache',
                'x-apikey': this.apiKey } };
        request(options, function (error, res, body) {
            if (error)
                throw new Error(error);
            cb(JSON.parse(body));
        });
    };
    return DBUtility;
}());
exports.DBUtility = DBUtility;
