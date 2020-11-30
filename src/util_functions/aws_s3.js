const stream = require('stream');
const AWS = require('aws-sdk');
const bluebird = require('bluebird');

AWS.config.update({
    accessKeyId: "",
    secretAccessKey: ""
  });
  
  // configure AWS to work with promises
  AWS.config.setPromisesDependency(bluebird);
  
  // create S3 instanc
  const s3 = new AWS.S3();
  
  async function uploadReadableStream(stream, name) {
    var params = { Bucket: '', ACL: 'public-read', Key: name, Body: stream };
    return s3.upload(params).promise();
  }
  
  exports.uploadToAws = async (stream, folder, name) => {
    // if imagePublicId param is presented we should overwrite the image
    try {
      const results = await uploadReadableStream(stream, name);
      return results;
      console.log('upload complete', results);
  
    } catch (error) {
      console.log('error', error)
    }
  };