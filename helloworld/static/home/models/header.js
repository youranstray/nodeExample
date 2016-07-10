define([
  "backbone"
, "config"
],
function(Backbone,config){
  var header = Backbone.Model.extend({
    initialize: function(){
      _.bindAll(this);
    },
    defaults: {
      username: '',
      email: '',
      signout: config.urls.signout
    }
  });
  return header;
});