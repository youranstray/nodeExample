define([
  'backbone'
, 'config'
, 'util'
],
function(Backbone,config,util){
  var credential = Backbone.Model.extend({
    defaults: {
      username:'',
      password:'',
      verifycode:''
    },

    initialize: function(){
    },
    
    url:function(){
      var base = config.authURL;
      base = base + (base.charAt(base.length - 1) == '/' ? '' : '/');
      return base + 'auth'; 
    },

    signin: function(args, callback){
      clgg.util.ajax.post(clgg.config.urls.signin,args,callback);
      
      
    },

    signout: function(opts, callback, args){
      clgg.util.ajax.post(clgg.config.urls.signout,args,callback);
    }
  });

  return credential;
});


