var express= require('express');
var gm = require('gm');
var vc = require('../util/verifycode');
module.exports.controller = function(parent) {
  var app = express();

  app.get(/^\/verifycode\.png$/i,function(req,res,next){
    var characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVXYZ",
        max = characters.length,
        charArr = [],
        length = 4,
        verifycode = "";

    for(var i = 0; i < length; i++){
        var r = Math.floor(Math.random()* max);
        charArr.push(characters.charAt(r));
    }

    verifycode = charArr.join('');

    res.cookie('verifycode', vc.encode(verifycode), {httpOnly:true});

    res.header('Content-Type', 'image/png');

    gm(85, 26, "#525252")
    .font("./fonts/Helvetica.ttf", 18)
    .drawText(5, 20, verifycode)
    .implode(-0.1)
    .swirl(20)
    .stream('png', function (err, stdout, stderr) {
      stdout.pipe(res);
    });
  });
  
  parent.use(app);
}