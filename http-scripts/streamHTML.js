'use strict';
const http = require('http');

const readHTML = function(url, callback){
  http.get(url, function(response) {
    let body = '';
    response.on('data', function(d) {
      body += d;
    });

    response.on('end', function() {
      callback(body);
    });
  })
}

const printHTML = function(htmlData) {
  console.log(htmlData);
}

readHTML("http://httpbin.org", printHTML);
