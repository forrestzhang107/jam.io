const aws = require('aws-sdk')
const fs = require('fs')

const s3 = new aws.S3({
  region: 'us-west-1',
  accessKeyId: '',
  secretAccessKey: '' 
})

const path = 'videos/'

function uploadFile(file, filename) {
  const params = {
    Bucket: '5g-hackathon',
    Key: path + filename,
    Body: file
  }
  s3.upload(params, (e, data) => {
    if (e) console.log(e)
  })
}


async function getFile(filename) {
  const params = {
    Bucket: '5g-hackathon',
    Key: path + filename,
  }
 s3.getObject(params, (e, data) => {
    if (e) console.log(e)
    console.log(data)
  })
}

uploadFile('just a string', 'test3.txt')
