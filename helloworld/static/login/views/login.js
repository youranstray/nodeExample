define([
  'backbone'
, 'text!login/templates/login.html'
, 'jquery'
, 'cookie'
, 'validate'
, 'validate-locale-zh'
, 'clgg'
],

function(Backbone,template,$) {
  var LoginView = Backbone.View.extend({
    el: '#login',
    template: _.template(template),
    events: {
     'click #submit': 'submit'
    },

    initialize: function(options) {
      this.app = options.app;
    },
    
    render: function() {
      var self = this;
      this.$el.html(this.template());
      this.$username = this.$('#username');
      this.$password = this.$('#password');
      this.$verifycode = this.$('#verifycode');
      this.$form = $("#loginform");
      //validate config
      this.$form.validate({
        errorPlacement: function(error, element) {
          $(element).closest("form") .find("span[for='" + element.attr("id") + "']").append(error);
        },
        errorElement: "label",
        rules:{
          username:{
            username:true,
            required:true
          },
          password:{
            required:true
          },
          verifycode:{
            required:true
          }
        }
      });

      return this;
    },

    submit: function(e){
      e.preventDefault();
      var self = this;
      self.$form.validate();
      if(!self.$form.valid()) return;

      self.model.set({
        username: self.$username.val(),
        password: self.$password.val(),
        verifycode: self.$verifycode.val()
      });

      self.model.sync('create',self.model,{
        success:function(model,response,options){
          top.location.href = 'http://www.baidu.com';
        },
        error:function(model,response,options){
          
        }
      });
      return false;
    }
    
  });

  return LoginView;
});