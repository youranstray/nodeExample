var express = require('express');

module.exports.controller = function(parent) {
  var app = express();
  /**
   * a auth route
   */
  app.post('/user/userservice/login', function(req, res) {
    var username = req.body.username
    , password = req.body.password
    ;

    if(username == 'clgg')
    {
      res.send({success:true,userid:1,usename: username,userroles:['admin'],token:'hello world'});
    }
    else
    {
      res.send({success:false});
    }
  });

  parent.use(app);
}

