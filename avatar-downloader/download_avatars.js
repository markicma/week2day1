'use strict';
const request = require('request');
const fs = require('fs');

const owner = process.argv[2];
const repo = process.argv[3];

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

const downloadImageByURL = function(url, filePath) {
  let dir = './avatars'
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  };
  request(url).pipe(fs.createWriteStream(filePath));
}

getRepoContributors(owner, repo, function (err, res, body) {
  const contributors = JSON.parse(body);
    contributors.forEach(function(elm){
      downloadImageByURL(elm.avatar_url, `./avatars/${elm.login}.png`);
    })
})
