const aws = require("aws-sdk");
const fs = require("fs");
const dotenv = require("dotenv");
const creds = require("./creds.json");

dotenv.config({ path: "../.env" });

const s3 = new aws.S3({
  region: "us-west-1",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

async function uploadFile(file, filename) {
  await fs.readFile(file, (err, data) => {
    const params = {
      Bucket: "5ghack-vids-raw",
      Key: filename,
      Body: data
    };
    s3.upload(params, (err, data) => {
      if (err) console.log(err);
    });
  });
}

var params = {
  Bucket: "5ghack-vids"
};

function getFileListsUtil() {
  const promise = new Promise((resolve, reject) => {
    s3.listObjectsV2(params, (e, data) => {
      if (e) {
        console.log(e, e.stack);
        console.log("errored");
        return reject("error");
      } else {
        resolve(data);
      }
    });
  });
  return promise;
}

async function getFileLists() {
  const data = await getFileListsUtil();
  allKeys = [];
  const contents = data.Contents;
  contents.forEach(content => {
    const key = content.Key;
    if (key.split(".")[1] == "mp4") allKeys.push(key);
  });
  return allKeys;
}

exports.getFileLists = getFileLists;

// async function getFile(filename) {
//   const url =  await s3.getSignedUrl("putObject", {
//     Bucket: "5g-hack",
//     Key: filename
//   });
//   return url;
// }

// async function getFileLink(filename) {
//   return await new Promise(function(resolve, reject) {
//     var options = {
//       keypairId: process.env.ACCESS_KEY_ID,
//       privateKeyPath: process.env.SECRET_ACCESS_KEY
//     };
//     var signedUrl = awsCloudFront.getSignedUrl(
//       process.env.CLOUDFRONT_URL + filename,
//       options
//     );
//     resolve(signedUrl);
//   });
// }

// async function getStreamLink(filename) {
//   const filepath = filename + "/" + filename + ".mp4";
//   return await 'd1xzn1tutffqqs.cloudfront.net/' + filepath;
// }

// exports.getStreamLink = getStreamLink;
// console.log(getStreamLink("test4"));
// console.log(getFile("testvid1.webm"));
// uploadFile("./10066830510.webm", "test3.webm");
