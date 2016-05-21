/**
 * @author xialeistudio
 * @date 2016/5/21 0021
 */
'use strict';
var Promise = require('bluebird');
/**
 * execute promises
 * @param promises
 * @param currentIndex
 * @return {Promise}
 */
function execute(promises, currentIndex) {
	//params check
	if (promises === undefined || promises === null || Object.prototype.toString.call(promises) !== '[object Array]') {
		return Promise.reject(new Error('promises should be a array'));
	}
	if (promises.length === 0) {
		return Promise.reject(new Error('promises should have least one promise'));
	}
	currentIndex = currentIndex || 0;
	return promises[currentIndex].catch(function(e) {
		//failed,execute next
		if (currentIndex < promises.length - 1) {
			return execute(promises, currentIndex + 1);
		}
		else {
			throw e;
		}
	});
}
module.exports = execute;