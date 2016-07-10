var clgg = window.clgg = window.clgg || {};
require([
  'login/views/login'
, 'login/views/verifycode'
, 'login/routes/login'
, 'login/models/credential'
],
function(LoginView,VerifycodeView, Routes,CredentialModel) {
  var Login = function() {
    this.routes = new Routes();
    this.views.login = new LoginView({model:new CredentialModel(),app:this});
    this.views.login.render();
    this.views.verifycode = new VerifycodeView();
    this.views.verifycode.render();
  };

  Login.prototype = {
    views: {}
  };

  clgg.Login = new Login();

  Backbone.history.start();
});