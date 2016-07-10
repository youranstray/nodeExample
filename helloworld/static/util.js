var clgg = window.clgg = window.clgg || {};
require([
  'underscore'
, 'jquery'
, 'querystring'
, 'base64'
],
function(_,$,qs) {
  if (!window.btoa) window.btoa = $.base64.btoa;
  if (!window.atob) window.atob = $.base64.atob;

  var util = util || {
    isSigned:function(){
      var userid = $.cookie('userid')|| false,token = $.cookie('token') || false;
      return (!_.isEmpty(userid)) && (!_.isEmpty(token));
    },
    retoken:function(userid, token){
      return 'Basic ' + window.btoa([userid,':',token].join(''));
    },
    authorize :function(){
      var userid = $.cookie('userid')|| '',token = $.cookie('token') || '';
      return this.retoken(userid,token);
    },
    getUserId:function(){
      return $.cookie('userid')|| false;
    },
    ajax:{
      type:{
        get:'GET',post:'POST',put:'PUT',del:'DELETE'
      },
      req:function(url,type,params,callback){
        var settings = {traditional:true,dataType: 'json'};
        switch(type)
        {
          case this.type.post:
          case this.type.del:
          case this.type.delete:
            settings.type = type;
            settings.data =  JSON.stringify(params);
            settings.contentType = 'application/json';
            settings.headers = {'Content-Type': 'application/json'};
            break;
          default:
            paramsString = qs.stringify(params);
            url = url + '?' + paramsString;
            settings.type = this.type.get;
            settings.headers = {'Content-Type': 'application/json'};
            break;
        }

        settings.url = url;

        if(util.isSigned())
        {
          settings.headers.Authorization = util.authorize();
        }

        _.extend(settings, {
          success: function(res){
            if(!res.error)
            {
              if(callback && 'success' in callback) callback.success(res);
            }
            else
            {
              if(callback && 'error' in callback ) callback.error(res);
            }
          },
          error: function(mod, res){
            if(callback && 'error' in callback ) callback.error(res);
          }
        });

        $.ajax(settings).complete( function(){
          if(callback && 'complete' in callback ) callback.complete(res);
        });
      },
      get:function(url,params,callback){
        this.req(url,this.type.get,params,callback);
      },
      post:function(url,params,callback){
        this.req(url,this.type.post,params,callback);
      },
      put:function(url,params,callback){
        this.req(url,this.type.put,params,callback);
      },
      del:function(url,params,callback){
        this.req(url,this.type.del,params,callback);
      }
    }
  };
  clgg.util = util;
  return util;
});