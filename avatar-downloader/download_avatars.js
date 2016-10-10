'use strict';
// Importing the functionality of the request and fs packages
const request = require('request');
const fs = require('fs');

// Including the command line functionality of the third and fourth parameters
const owner = process.argv[2];
const repo = process.argv[3];

// The getRepoContributors function has two parameters, the repo owner name and
// the name of the repo. The endpoint using those parameters is then added to the
// root. From this link, the function gets the JSON file in a string format and
// the callback function is applied to it.
const getRepoContributors = function(repoOwner, repoName, cb) {
  const root = 'https://api.github.com';
  const options = {
    url:`${root}/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request'
    }
  }
  request.get(options, cb);
};

// The downloadImageByURL takes two parameters, the image url and the download
// location. The function checks to see if the avatars folder exists in
// the current folder and if not present, creates one.
// Then using the request and fs packages downloads the images into the specified
// foler.
const downloadImageByURL = function(url, filePath) {
  let dir = './avatars'
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  };
  request(url).pipe(fs.createWriteStream(filePath));
}

// Calls the getRepoContributors with the third and fourth parameter from the
// command line. The JSON file in string format is parsed into an array of objects.
// In each object in the array the avatar url is selected and the image is downloaded
// into the avatars folder using the username of the contributor. 
getRepoContributors(owner, repo, function (err, res, body) {
  const contributors = JSON.parse(body);
    contributors.forEach(function(elm){
      downloadImageByURL(elm.avatar_url, `./avatars/${elm.login}.png`);
    })
})
