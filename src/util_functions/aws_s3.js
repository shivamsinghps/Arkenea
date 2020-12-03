const AWS = require('aws-sdk');
const bluebird = require('bluebird');
const uuid = require('uuid/v4')

AWS.config.update({
    accessKeyId: process.env.AWS_AID,
    secretAccessKey: process.env.AWS_SKEY
  });
  
  // configure AWS to work with promises
  AWS.config.setPromisesDependency(bluebird);
  
  // create S3 instanc
  const s3 = new AWS.S3();
  
  async function uploadReadableStream(stream) {
    var params = { Bucket: process.env.AWS_BUCKET, ACL: 'public-read', Key: `${uuid()}.DCM`, Body: stream };
    return s3.upload(params).promise();
  }
  
  exports.uploadToAws = async (stream) => {
    // if imagePublicId param is presented we should overwrite the image
    try {
      const results = await uploadReadableStream(stream);
      console.log('upload complete');
      return results;
      
  
    } catch (error) {
      console.log('error', error)
    }
  };