define([
  'backbone'
, 'text!home/templates/menu.html'
, 'config'
, 'jquery'
, 'cookie'
, 'easyui'
, 'iframe-auto-height'
],

function(Backbone,template,config,$) {
  var MenuView = Backbone.View.extend({
    el: '#menu',
    template: _.template(template),
    
    url: function(){
      return config.urls.menu;
    },

    initialize: function() {
    },
    
    render: function() {
      var self = this;
      this.$el.html(this.template());
      this.$tt = $('#tabs').tabs();
      this.userrole = $.cookie('userrole') || '';
      $('body').layout();
      this.$('ul.easyui-tree').tree({
        url: this.url(),
        queryParams: {userrole: this.userrole},
        onClick: this.add
        //formatter: this.formatter
      });
      return this;
    },
    
    formatter: function(node){
      if(node.children)
      {
        return node.text;
      }
      else
      {
        return ['<a class="e-link" href="javascript:void(0);" tabtitle="',node.text,'" tabhref="',node.url,'">',node.text,'</a>'].join('');
      }
    },
    
    add: function(node){
      if(node.children) {return;}
      var title = node.text, href  = node.url, icon  = node.icon,content = '', tt = $('#tabs');
      if (tt.tabs('exists', title))
      {
        tt.tabs('select', title);
        //refresh tab
        var tab = title? tt.tabs('getTab',title): tt.tabs('getSelected');
        if(tab && tab.find('iframe').length > 0)
        {
          var iframe = tab.find('iframe')[0];
          href = href?href:iframe.src;
          iframe.contentWindow.location.href=href;
          $(iframe).iframeAutoHeight();
        }
      }
      else 
      {
        var id = 'iframe'+new Date().getTime();
        if (href)
        {
          content = '<iframe scrolling="no" id="'+id+'" frameborder="0" src="'+href+'" style="width:100%;height:100%;"></iframe>';
        }
        else 
        {
          content = 'no content';
        }
        tt.tabs('add',{
          title:title,
          closable:true,
          content:content,
          iconCls:icon||'icon-default'
        });

        $('#'+id).iframeAutoHeight();
      }
    }
  });

  return MenuView;
});