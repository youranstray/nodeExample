define([
  'backbone'
, 'text!header/templates/header.html'
], 
function(Backbone,template) {
  var HeaderView = Backbone.View.extend({
    el: '#header',
    template: _.template(template),

    initialize: function() {
    },
    
    render: function() {
      var self = this;
      this.$el.html(this.template());
      return this;
    }
  });

  return HeaderView;
});