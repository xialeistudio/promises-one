/**
 * @author xialeistudio
 * @date 2016/5/21 0021
 */
'use strict';
require('should');
var Promise = require('bluebird');
var PromisesOne = require('../index');
describe('test execute', function() {
	it('should throw error promises should be a array', function(done) {
		PromisesOne(null).then(function() {
			done();
		}).catch(function(e) {
			e.message.should.be.equal('promises should be a array');
			done();
		});
	});
	it('should throw promises should have least one promise', function(done) {
		PromisesOne([]).then(function() {
			done();
		}).catch(function(e) {
			e.message.should.be.equal('promises should have least one promise');
			done();
		});
	});
	it('should return promise1 executed successfully', function(done) {
		var promise1 = new Promise(function(resolve, reject) {
			setTimeout(resolve('promise1 executed successfully'), 1000);
		});
		var promise2 = new Promise(function(resolve, reject) {
			setTimeout(resolve('promise2 executed successfully'), 1000);
		});
		PromisesOne([promise1, promise2]).then(function(data) {
			data.should.be.equal('promise1 executed successfully');
			done();
		}).catch(done);
	});
	it('should return promise2 executed successfully', function(done) {
		var promise1 = new Promise(function(resolve, reject) {
			setTimeout(reject(new Error('promise1 executed failed')), 1000);
		});
		var promise2 = new Promise(function(resolve, reject) {
			setTimeout(resolve('promise2 executed successfully'), 1000);
		});
		PromisesOne([promise1, promise2]).then(function(data) {
			data.should.be.equal('promise2 executed successfully');
			done();
		}).catch(done);
	});
	it('should throw promise2 executed failed', function(done) {
		var promise1 = new Promise(function(resolve, reject) {
			setTimeout(reject(new Error('promise1 executed failed')), 1000);
		});
		var promise2 = new Promise(function(resolve, reject) {
			setTimeout(reject(new Error('promise2 executed failed')), 1000);
		});
		PromisesOne([promise1, promise2]).catch(function(e) {
			e.message.should.be.equal('promise2 executed failed');
			done();
		});
	});
});