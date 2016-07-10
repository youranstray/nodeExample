/**
 * Module dependencies.
 */
var express = require('express');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
var methodOverride = require('method-override');
var util = require('underscore');
var config = require('./config');
var app = express();
var maxAge = 86400000;
var lastModified = new Date().toUTCString();

// tempalate default parameters
var options = {
  version: new Date().getTime(),
  charset: 'utf-8',
  lang: 'zh'
};

// CORS support
app.all('*', function(req, res, next) {
  res.set("Access-Control-Allow-Origin", req.get('origin'));
  res.set("Access-Control-Allow-Methods", "GET, POST,OPTIONS");
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-Range,Content-Disposition, Accept");
  if(!res.get('cookie')) res.set("Access-Control-Allow-Credentials","true");
  //if (!res.get('Cache-Control'))
  //res.set('Cache-Control', 'public, max-age=' + maxAge);
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

// serve static files
//app.use(express.static(__dirname + '/webapps'));

// ignore GET /favicon.ico
//app.use(express.favicon());

// enable compress transfer
//app.use(express.compress())

// Register ejs as .html. If we did
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
// we simply pass _any_ function, in this
// case `ejs.__express`.

//app.engine('.html', require('ejs').__express);

// Optional since express defaults to CWD/views

//app.set('views', __dirname + '/views');

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
//app.set('view engine', 'html');

// define a custom res.message() method
// which stores messages in the session
app.response.message = function(msg){
  // reference `req.session` via the `this.req` reference
  var sess = this.req.session;
  // simply add the msg to an array for later
  sess.messages = sess.messages || [];
  sess.messages.push(msg);
  return this;
};

// log
app.use(logger('dev'));

// parses request cookies, populating
// req.cookies and req.signedCookies
// when the secret is passed, used
// for signing the cookies.
app.use(cookieParser('my secret here'));

// parses x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Populates req.session
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat'
}));

// allow overriding methods in query (?_method=put)
app.use(methodOverride('_method'));

// expose the "messages" local variable when views are rendered
app.use(function(req, res, next){
  var msgs = req.session.messages || [];

  // expose "messages" local variable
  res.locals.messages = msgs;
  
  //res.locals.options = options;
  res.locals = util.extend({}, res.locals, options);

  // expose "hasMessages"
  res.locals.hasMessages = !! msgs.length;

  /* This is equivalent:
   res.locals({
     messages: msgs,
     hasMessages: !! msgs.length
   });
  */

  next();
  // empty or "flush" the messages so they
  // don't build up
  req.session.messages = [];
});

// dynamically include routes (Controller)

fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
    route = require('./controllers/' + file);
    route.controller(app);
  }
});

// assume "not found" in the error msgs
// is a 404. this is somewhat silly, but
// valid, you can do whatever you like, set
// properties, use instanceof etc.
app.use(function(err, req, res, next){
  // treat as 404
  if (~err.message.indexOf('not found')) return next();

  // log it
  console.error(err.stack);

  // error page
  res.status(500).render('5xx');
});

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl });
});

if (!module.parent) {
  app.listen(9000);
  console.log('Express app started on port 9000');
}


