define([
  'backbone'
, 'text!login/templates/verifycode.html'
, 'config'
],
function(Backbone,template,config) {
  var VerifycodeView = Backbone.View.extend({
    el: '#verifycode-image',
    template: _.template(template),
    events: {
      'click img': 'refresh'
    },
    
    initialize: function() {
      this.src = config.urls.verifycode;
    },

    render: function() {
      this.$el.html(this.template());
      this.$img = this.$el.find('img');
      this.$img.attr('src',this.src);
      return this;
    },

    refresh: function(event){
      this.$img.attr('src', this.src + '?r='+ (new Date()).getTime());
    }
  });

  return VerifycodeView;
});