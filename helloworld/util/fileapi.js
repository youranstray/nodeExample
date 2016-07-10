var gm = require('gm');
var fs = require('fs');
var fse = require('fs-extra');
var config = require('../config');
var  _ = require('underscore');

var FileAPI = {};

FileAPI.getImageSize = function(file){
  gm(fs.createReadStream(file.path))
  .size(function (err, size) {
    if (!err) return size;
    else return {width:0, height: 0};
  });
};
FileAPI.getFolder = function(type,file){
  var tmaps = _.invert(config.filetypes||{})
  , key = tmaps[type]
  ;
  if(_.isEmpty(key)){return;}
  if(this.isImage(file))
  {
    return config.uploadfolders[key].image;
  }
  else
  {
    return config.uploadfolders[key].other;
  }
};

FileAPI.isImage = function(file){
  return file.type.indexOf('image') !== -1;
};

FileAPI.getExtension = function(filename){
  filename = filename || '';
  var dotIndex = filename.lastIndexOf('.');
  return filename.substring(dotIndex);
};

FileAPI.getFilename = function(file){
  var path = file.path;
  return path.substring(path.lastIndexOf('\\'));
};

FileAPI.mkdir = function(folder,recursive){
  if(fs.existsSync(folder)) return;
};

FileAPI.remove = function(file,toFolder,newName,zoom,sizes){
  var self = this;
  if(!file.path) return;
  toFolder = toFolder||'.\\';
  zoom = self.isImage(file) ? (zoom||false) : false;
  sizes = sizes || new Array();

  if(!fs.existsSync(toFolder)){
    fse.mkdirsSync(toFolder);
  }
  var filename = self.getFilename(file),
    name = newName || filename.substring(0, filename.lastIndexOf('.'));

  var from = file.path
    , extension = self.getExtension(file.name)
    , to = toFolder + name + extension;

  fs.rename(from, to, function(err) {
    if (err)
    {
      console.log(err);
      return;
    }
    if(zoom)
    {
      sizes.forEach(function(size){
        gm(fs.createReadStream(to))
          .resize(size.width, size.height)
          .stream(function (err, stdout, stderr) {
            var writeStream = fs.createWriteStream(toFolder+name+'-'+size.width+'x'+size.height+extension);
            stdout.pipe(writeStream);
          });
      });
    }
  });
};


FileAPI.getFileContent = function(file){
  return fs.readFileSync('.\\'+file.path, "utf8");
};

FileAPI.fetchImages = function(files){
  var images = {}, file, size, dataURL;
  for(var name in files){
    file = files[name];
    size = this.getImageSize(file);
    dataURL = new Array();
    dataURL.push('data:');
    dataURL.push(file.type);
    dataURL.push(';base64,');
    dataURL.push(new Buffer(this.getFileContent(file)).toString('base64'));
    if(file.type.indexOf('image') !== -1){
      images[name] = {
        'width': size.width,
        'height': size.height,
        'mime': file.type,
        'size': file.size,
        'dataURL':dataURL.join('')
      };
    }
  }
  return images;
};

module.exports = FileAPI;