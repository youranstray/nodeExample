var util = require('underscore');
var express = require('express');
var ws = require('../util/webservice');
var pass = require('../util/pass');
var vc = require('../util/verifycode');
var config = require('../config');

module.exports.controller = function(parent) {
  var app = express();
  /**
   * a auth route
   */

  app.post('/auth', function(req, res) {
    var verifycode = req.cookies.verifycode;

    if(!vc.check(req.body.verifycode, verifycode))
    {
      res.send({'success':false, 'message':'验证码错误'});
      return;
    }

    ws.post(req,config.ws.paths.signin,{
      username: req.body.username,
      password: req.body.password
    },function(data){
      if(data.success){
        res.cookie('userid',data.userid,{domain: config.cookiedomain, maxAge: config.cookiemaxage});
        res.cookie('userrole',data.userrole || 'anonymous',{domain: config.cookiedomain, maxAge: config.cookiemaxage});
        res.cookie('token',data.token,{domain: config.cookiedomain, maxAge: config.cookiemaxage});
        req.session.userid = data.userid;
        req.session.authorization = pass.retoken(data.userid,data.token);
        res.send({'success':true,'token': data.userid+'=='+data.token});
      }
      else
      {
        res.send({'success':false, 'message':'用户名或密码错误'});
      }
    });
  });

  app.delete('/auth', function(req, res) {
    res.cookie('userid','0',{domain: config.cookiedomain, maxAge:0});
    res.cookie('userrole','0',{domain: config.cookiedomain, maxAge: 0});
    res.cookie('token','0',{domain: config.cookiedomain, maxAge:0});
    if(!req.session.userid)
    {
      res.redirect('/login');
      return;
    }
  
    var userid = req.session.userid;
    ws.post(req,config.ws.paths.login,{
      'userid': userid
    },function(response){
      delete req.session.userid;
      delete req.session.token;
      res.redirect('/login');
    });

  });

  parent.use(app);
}

