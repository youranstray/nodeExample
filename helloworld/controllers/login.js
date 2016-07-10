var express= require('express');
var util = require('underscore');
module.exports.controller = function(parent) {
  var app = express();
  
  //login route
  app.get('/login', function(req, res) {
    res.render('login', util.extend({},{
      title: 'ÓÃ»§µÇÂ½'
    },res.locals.options));
  });
  
  parent.use(app);
}