var config = require('../config');
var crypto = require('./crypto');
var util= require('underscore');

var vc = {};

vc.separtor = '_';

vc.encode = function(verifycode){
  if(util.isEmpty(verifycode)){return;}
  var timestamp = new Date().getTime()
  , plaintext = verifycode +vc.separtor+ timestamp
  , ciphertext = '';
  try{ciphertext = crypto.encrypt(plaintext);}catch(e){}
  return ciphertext;
};

vc.check = function(verifycode, ciphertext){
  if(util.isEmpty(verifycode) || util.isEmpty(ciphertext)){return false;}
  var now = new Date().getTime()
  , timeout = config.verifycodetimeout||0
  , plaintext = ''
  ;
  // decrypt ciphertext
  try{plaintext = crypto.decrypt(ciphertext);}catch(e){return false;}
  
  console.log(plaintext);
  
  if(util.isEmpty(plaintext)){return false;}
  var splitindex = plaintext.indexOf(vc.separtor);
  if(splitindex < 0 || splitindex == plaintext.length){return false;}
  var code = plaintext.substring(0,splitindex)
  , timestamp = parseInt(plaintext.substring(splitindex+1))
  ;
  if((now-timestamp) > timeout || code !== verifycode){return false;}
  return true;
};


module.exports = vc;