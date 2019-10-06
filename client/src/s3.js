const aws = require("aws-sdk");
const fs = require("fs");
const uuid = require("uuid/v1");
const dotenv = require("dotenv");

dotenv.config();

const s3 = new aws.S3({
  region: "us-west-1",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

function uploadFile(file, filename) {
  fs.readFile(file, (err, data) => {
    const params = {
      Bucket: "5g-hack-vids-raw",
      Key: filename,
      Body: data
    };
    s3.upload(params, (err, data) => {
      if (err) console.log(err);
    });
  });
}

var params = {
  Bucket: "5g-hack"
};

s3.listObjectsV2(params, function(err, data) {
  allKeys = [];
  if (err) console.log(err, err.stack);
  else var contents = data.Contents;
  contents.forEach(function(content) {
    allKeys.push(content.Key);
  });
  // console.log(allKeys);
  //console.log(data);
});

function getFile(filename) {
  const url = s3.getSignedUrl("putObject", {
    Bucket: "5g-hack",
    Key: filename
  });
  return url;
}

function getFileLink(filename) {
  return new Promise(function(resolve, reject) {
    var options = {
      keypairId: process.env.ACCESS_KEY_ID,
      privateKeyPath: process.env.SECRET_ACCESS_KEY
    };
    var signedUrl = awsCloudFront.getSignedUrl(
      process.env.CLOUDFRONT_URL + filename,
      options
    );
    resolve(signedUrl);
  });
}

function getStreamLink(filename) {
  const filepath = filename + "/" + filename + ".mp4";
  return process.env.CLOUDFRONT_URL + filepath;
}

// console.log(getStreamLink("test4"));
// console.log(getFile("testvid1.webm"));
//uploadFile("./6241894663.webm", "test4.webm");
