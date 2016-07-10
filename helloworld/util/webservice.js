var http = require('http');
var util = require('underscore');
var qs = require('querystring');
var config = require('../config'); 
var pass = require('./pass');

var ws = {};

var defaultOptions ={
  host: config.ws.host,
  port: config.ws.port,
  path: '/'
};

ws.req = function( req,method, path, params, callback){
  if(!util.isObject(params)) throw new Error('WebService调用参数错误');
  var options = util.extend({}, defaultOptions, {
    path: path,
    method: method
  })
  , paramsString = ''
  ;

  switch(method)
  {
    case 'PUT':
    case 'POST':
    case 'DELETE':
      paramsString = JSON.stringify(params);
      options.headers = {'Content-Type': 'application/json','Content-Length': paramsString.length};
      break;
    default:
      paramsString = qs.stringify(params);
      options.headers = {'Content-Type': 'application/json'};
      options.method = 'GET';
      options.path = path + '?' + paramsString;
      break;
  }
  
  options.headers = options.headers || {};

  if(req.session.authorization)
  {
    options.headers.Authorization = req.session.authorization;
  }
  
  // Setup the request.
  var request = http.request(options, function(res) {
    res.setEncoding('utf-8');
    
    var buffer = [];
    res.on('data', function(data){
      buffer.push(data);
    });
    
    res.on('end', function() {
      var result = {};
      if(!util.isFunction(callback)) return;
      try
      {
        result = JSON.parse(buffer.join(''));
      }
      catch(e)
      {
        result = {'success':false};
      }
      callback(result);
    });
  });

  request.on('error', function(e) {
    console.log(e);
  });
  
  if(method ==="PUT" || method ==="POST" || method ==="DELETE"){
    request.write(paramsString);
  }

  request.end();
};

ws.get = function(req,path, params, callback){
  this.req(req,'GET', path, params, callback);
};

ws.post = function(req,path, params, callback){
  this.req(req,'POST', path, params, callback);
};

ws.put = function(req,path, params, callback){
  this.req(req,'PUT', path, params, callback);
};

ws.del = function(req,path, params, callback){
  this.req(req,'DELETE', path, params, callback);
};

module.exports = ws;