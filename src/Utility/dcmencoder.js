const decrypt = require('./dcmdecoder')
var encryptor = require('file-encryptor'),
  //  const fs = require('fs'),
   path = require('path');

var encrypt = function(input) {
    encryptor.encryptFile(
      path.join(process.cwd(), `uploads/${input}`),
      path.join(process.cwd(), `enc_file/${input}`),
      process.env.SALT,
      function(err) {
        console.log(input + ' encryption complete.');
        decrypt(input);
      }
    );
  };

module.exports = encrypt