var pass = {};
pass.retoken= function(userid, token){
  var array = [];
  array.push(userid);
  array.push(':');
  array.push(token); 
  return 'Basic ' + (new Buffer(array.join('')).toString('base64'));
};

module.exports = pass;