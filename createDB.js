var MongoClient = require('mongodb').MongoClient;
var url = "https://tmdatabase-864c.restdb.io/trainee_management";

var trainees = [{trainee_id: '1552200', email: 'cwmason@crimson.ua.edu', first_name: 'Connor', last_name: 'Mason', batch_id: 'JUN_18_1', password: 'nottodaysatan', city_preferences: [{Ohio: 'cincinnati'},{Texas: 'austin'},{Colorado: 'denver'}], domain_preferences: ['banking', 'front-end', 'data science']},{trainee_id: '1773300', email: 'something@gmail.com', first_name: 'Loser', last_name: 'Notsmart', batch_id: 'JUL_18_4', password: 'password'}];

var restdbAPIKey = '369d82557cfeecc580923e9e1788e3444271f';

MongoClient.connect(url, function(err, db) {
	return this.http.post<any>('http://localhost:3000/traineelist');
	db.collection('trainees', function(err, collection) {
		collection.insertMany(trainees);
	});
}).setRequestHeader(x-apikey, restdbAPIKey);
