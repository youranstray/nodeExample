define([
  "backbone"
],
function(Backbone) {
  return Backbone.Router.extend({
    routes: {
      'login/:username/:password/:verifycode': 'login'
    },

    initialize: function() {
    },

    login: function(username,password,verifycode) {
      console.log(username +","+password+","+verifycode);
    }
  });
});
