'use strict';
const request = require('request');

const readHTML = function (url, callback){
  request(url, function(err, response, body) {
    if (err) {
      throw err;
    }

    callback(body);
    });
}

const printHTML = function(htmlData) {
  console.log(htmlData);
}

readHTML("http://httpbin.org", printHTML);
