define([
  'header/views/header'
],

function(HeaderView) {
  var Header = function() {
    this.views.header = new HeaderView();
    this.views.header.render();
  };

  Header.prototype = {
    views: {}
  };

  return Header;
});