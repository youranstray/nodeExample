var config = require('../config');
var nodecryptojs = require('node-cryptojs-aes');
var CryptoJS = nodecryptojs.CryptoJS;
var formatter = nodecryptojs.JsonFormatter;

var crypto = {};

crypto.encrypt = function(plaintext){
  if (plaintext === '') {return;}
  // encrypt plain text with passphrase and custom json serialization format, return CipherParams object
  // r_pass_base64 is the passphrase generated from first stage
  // message is the original plain text
  var ciphertext = CryptoJS.AES.encrypt(plaintext, config.key, { format: formatter});
  return ciphertext.toString();
};

crypto.decrypt = function(ciphertext){
  if(ciphertext ==='') {return;}
  // decrypt data with encrypted json string, passphrase string and custom JsonFormatter
  var decrypted = CryptoJS.AES.decrypt(ciphertext, config.key, { format: formatter});
  // convert to Utf8 format unmasked data
  var plaintext = CryptoJS.enc.Utf8.stringify(decrypted);
  return plaintext;
};

module.exports = crypto;