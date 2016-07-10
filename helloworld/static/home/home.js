var clgg = window.clgg = window.clgg || {};
require([
  'home/views/header'
, 'home/views/menu'
, 'home/routes/home'
, 'home/models/header'
],
function(HeaderView,MenuView, Routes,HeaderModel) {
  var Home = function() {
    this.routes = new Routes();
    this.views.header = new HeaderView({model:new HeaderModel({username:'Tom'})});
    this.views.header.render();
    this.views.menu = new MenuView(this);
    this.views.menu.render();
  };

  Home.prototype = {
    views: {}
  };

  clgg.Home = new Home();

  Backbone.history.start();
});