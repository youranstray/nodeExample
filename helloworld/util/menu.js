var config = require('../config');
var util = require('underscore');

// build tree from records's parent-child relationship: child's parentId = parent's id
// convert the follow array:
// [{id:0, parentId: null, name: '0'},{id:1, parentId: 0, name: '0-1'},{id:2, parentId: 0, name: '0-2'}]
// to
// [{id:0, parentId: null, name: '0', chldren:[{id:1, parentId: 0, name: '0-1', children: null, leaf: true},{id:2, parentId: 0, name: '0-2', children: null, leaf: true}]]
//
var tree = function(records, nodeParam, parentParam, childrenParam, leafParam){
  var maps = {}
  ,   key = ''
  ,   trees = new Array()
  ;
  nodeParam = 'id';
  parentParam = parentParam || 'pid';
  childrenParam  = childrenParam || 'children';
  leafParam = leafParam || 'leaf';

  records.forEach(function(element, index, array){
    if(!element[parentParam]){
      trees.push(element);
    }
    else{
      key = element[parentParam].toString();
      if(maps[key]){ maps[key].push(element);} else { maps[key] = [element];}
    }
  });

  var getChildren = function(id){
    var children = maps[id] || null;
    if(children){
      children.forEach(function(child,index,array){
        child[childrenParam] = getChildren(child[nodeParam]);
        if(!child[childrenParam]) child[leafParam] = true;
      });
    }
    return children;
  };

  trees.forEach(function(element, index, array){
    element[childrenParam] = getChildren(element[nodeParam]);
  });

  return trees;
};

var menus = {};

menus.get = function(role){
  var allMenus = util.clone(config.menus)
  , results = new Array()
  ;

  allMenus.forEach(function(element, index, array){
    if(util.indexOf(element['roles'], role) !== -1){
      //delete element['roles'];
      var item = util.omit(util.clone(element),'roles');
      results.push(item);
    }
  });

  return tree(results);
};

menus.left = function(parentHrefRegExp, structedMenus){
  var stack = new Array()
  ,   pop = null
  ,   cur = null
  ,   flag = false
  ,   result = new Array()
  ;
  if(!util.isRegExp(parentHrefRegExp)) return result;
  
  structedMenus.forEach(function(element){
    stack.push(element);
    while(!util.isEmpty(stack)){
      pop = stack.pop();

      if(!flag && parentHrefRegExp.test(pop['href'])){
        flag = true;
        pop['selected'] = true;
        element['selected'] = true;
        result =  element[childrenParam];
        break;
      }
      else{
        if(!util.isEmpty(pop['children']))
        pop['children'].forEach(function(child){
          stack.push(child);
        });
      }
      if(flag) return result;
    }
  });

  return result;
};

module.exports = menus;