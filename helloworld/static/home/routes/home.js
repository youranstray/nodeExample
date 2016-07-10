define([
  "backbone"
],
function(Backbone) {
  return Backbone.Router.extend({
    routes: {
      'logout/:userid': 'logout'
    },

    initialize: function() {
    },

    logout: function(userid) {
      
    }
  });
});
