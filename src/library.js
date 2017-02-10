'use strict';

const winston = require('winston')

function Library(app) {
	this.app = app;
}

Library.prototype.getTokens = function(callback) {
	var db = this.app.adminDB;
	var ref = db.ref("registration_tokens");
	ref.once("value", function(snapshot) {
		callback(snapshot.val());
	});
};

Library.prototype.set = function(token) {
	var db = this.app.adminDB;
	var ref = db.ref("registration_tokens").child(token);
	ref.set({test: 'sblah'} , function(err){
		if (err) {
			winston.log('debug', err);
		}	
	});
};

module.exports = Library;
