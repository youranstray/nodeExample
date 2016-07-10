define([
  'backbone'
, 'text!footer/templates/footer.html'
], 
function(Backbone,template) {
  var FooterView = Backbone.View.extend({
    el: '#footer',
    template: _.template(template),

    initialize: function() {
    },
    
    render: function() {
      var self = this;
      this.$el.html(this.template());
      return this;
    }
  });

  return FooterView;
});