define([
  'backbone'
],function(){
  var image = Backbone.Model.extend({
    defaults: {
      name: 'image',
      accept:'image/*'
    },

    initialize: function(){
    }
  });

  return image;
});