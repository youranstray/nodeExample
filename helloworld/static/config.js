var clgg = window.clgg = window.clgg || {};
define([], function() {
  var config = {};
  config.baseURL = 'http://www.clgg.com:9000/';
  config.authURL = 'http://www.clgg.com:3000/';
  config.fileURL = 'http://www.clgg.com:3000/';

  clgg.config = config;
  return config;
});
