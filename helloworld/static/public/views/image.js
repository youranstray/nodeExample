define([
  'backbone'
, 'text!public/templates/image.html'
, 'public/models/image'
, 'FileAPI'
, 'FileAPI.exif'
],
function(Backbone,template,ImageModel,FileAPI) {
  var ImageView = Backbone.View.extend({
    template: _.template(template),
    events: {

    },

    initialize: function(options) {
      this.model = new ImageModel(options);
    },

    render: function() {
      var self = this;
      var $el = $(this.el);
      $el.html(self.template(self.model.toJSON()));
      self.file = self.$('input[type=file]')[0];
      self.preview = self.$('div.preview')[0];
      self.$image = self.$('div.preview > div.image');

      FileAPI.event.on(self.file, 'change', function (){
          self.preview.style.display = '';
          var file = FileAPI.getFiles(self.file)[0];
          FileAPI.Image(file).resize(100, 100, 'max').get(function (err, img){
            self.$image.html('');
            self.$image.append(img);
          });
       });
      return this;
    }

  });

  return ImageView;
});