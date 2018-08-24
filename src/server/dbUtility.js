// "use strict";
// exports.__esModule = true;
// var request = require("request");
// var DBUtility = /** @class */ (function () {
//     function DBUtility(baseURL, apiKey) {
//         if (baseURL === void 0) { baseURL = 'https://tmdatabase-864c.restdb.io/rest/'; }
//         if (apiKey === void 0) { apiKey = '369d82557cfeecc580923e9e1788e3444271f'; }
//         this.baseURL = baseURL;
//         this.apiKey = apiKey;
//     }
//     /**
//      * GET all documents from the collection
//      * @param collectionName
//      * @param cb
//      */
//     DBUtility.prototype.getAllRecordsFrom = function (collectionName, cb) {
//         var URL = this.baseURL + collectionName;
//         console.log(URL);
//         var options = { method: 'GET',
//             url: URL,
//             headers: { 'cache-control': 'no-cache',
//                 'x-apikey': this.apiKey } };
//         request(options, function (error, res, body) {
//             if (error)
//                 throw new Error(error);
//             cb(JSON.parse(body));
//         });
//     };
//     DBUtility.prototype.addNewDocument = function (document, cb) {
//         var options = { method: 'POST',
//             url: 'https://tmdatabase-864c.restdb.io/rest/trainees',
//             headers: { 'cache-control': 'no-cache',
//                 'x-apikey': '369d82557cfeecc580923e9e1788e3444271f',
//                 'content-type': 'application/json' },
//             body: document,
//             json: true };
//         request(options, function (error, response, body) {
//             if (error)
//                 throw new Error(error);
//             cb(JSON.parse(body));
//             console.log(body);
//         });
//     };
//     return DBUtility;
// }());
// exports.DBUtility = DBUtility;
