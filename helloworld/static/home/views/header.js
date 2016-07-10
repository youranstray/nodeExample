define([
  'backbone'
, 'text!home/templates/header.html'
], 
function(Backbone,template) {
  var HeaderView = Backbone.View.extend({
    el: '#header',
    template: _.template(template),

    initialize: function() {
      this.model.on('change', this.render, this);
    },
    
    render: function() {
      var self = this;
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return HeaderView;
});