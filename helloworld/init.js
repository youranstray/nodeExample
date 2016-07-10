var config = require('./config');
var fs = require('fs');
var fse = require('fs-extra');
var _ = require('underscore');

module.exports = function(){
  var folders = new Array();
  try
  {
    folders = _.reduce(_.values(config.uploadfolders).map(function(a){return _.values(a);}), function(a, b){ return _.union(a,b); },[]);
  }
  catch(e)
  {
    return;
  }

  if(_.isEmpty(folders))
  {
    return;
  }

  _.each(folders,function(folder){
    fs.exists(folder, function(exists) {
      if (!exists)
        fse.mkdirs(folder,function(e){});
    });
  });
};
