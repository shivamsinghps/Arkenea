var encryptor = require('file-encryptor'),
  //  const fs = require('fs'),
 path = require('path');

var decrypt = function(input) {
    encryptor.decryptFile(
      // path.join(process.cwd(), encrypted),
      path.join(process.cwd(), `enc_file/${input}`),
      path.join(process.cwd(), 'dec_files/decrypted.' + input),
      process.env.SALT,
      function(err) {
        console.log(input + ' decryption complete.');
      }
    );
  };

  module.exports = decrypt