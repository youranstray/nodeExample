var config = {}, t;

config.webservice = {host: 'www.clgg.com',port: 9000};
config.ws = config.webservice;
config.ws.paths= {
  signin: '/user/userservice/login',
  signout: '/user/userservice/logout',
  identityupload:'/user/identity/upload',
  carupload:'/user/car/upload',
  contractupload: '/user/contract/upload',
  companyupload:'/user/company/upload'
};

config.server = {host:'www.clgg.com', port: 3000};

config.key ='eNwAzoxuSabIOGt/NUdvi2AiC3d7N54sMYQHSiqD36RUwyMZGI3qqcxWFz7XKThLUJ2mowDZV3WRmd35Nm4ir+963tlWFdQ35vZJb+lk3TZDjehNpfziipyziGraO74Y7ANQtKuYcBrpk0w8hbpHxrBZGVde3gURAkbxCmU5nq';

//验证码有效时间3分钟(180000毫秒)
config.verifycodetimeout = 180000;

//Ccokie最大生命周期=2周
config.cookiemaxage = 14*24*60*60*1000;

config.cookiedomain = '.clgg.com';

//文件上传目录
config.uploadfolders = {
  root:{file: '.\\uploads\\'},
  temp:{file: '.\\uploads\\tmp\\'},
  identitycard: {image:'.\\uploads\\id\\image\\'},
  car: {image:'.\\uploads\\car\\image\\'},
  company: {image:'.\\uploads\\company\\image\\',other:'.\\uploads\\company\\other\\'},
  contract: {image:'.\\uploads\\sign\\image\\',other:'.\\uploads\\sign\\other\\'}
};

//文件类别
config.filetypes = {
  identitycard: 1,
  car:2,
  company:3,
  contract:4
}

//文件类型
config.filekinds ={
  identitycard: {front:1,back:2},
  car:{},
  company:{business:1,tax:2,organization:3},
  contract:{}
};
//图片缩图尺寸
config.zoomsizes = {
  identitycard: [{width:60,height:60},{width:100,height:100}],
  car: [{width:60,height:60},{width:100,height:100}],
  company: [{width:60,height:60},{width:100,height:100}],
  contract: [{width:60,height:60},{width:100,height:100}]
};

//缩略图大小
config.imageZoomSizes = [{width:60,height:60},{width:100,height:100}];

config.uploadoption = {
  encoding:'utf-8',
  keepExtensions: true,
  maxFilesSize :2*1024*1024,
  autoFields :true,
  autoFiles :true,
  uploadDir :config.uploadfolders.temp.file,
  hash:'md5'
};

config.role = {
  admin: 'admin',
  sale: 'user'
};

var url = function(path){
  if(path){
    return ['http://',config.server.host,':',config.server.port,'/',path].join('');
  }
  return path;
};


config.menus = [
  {id:  1, pid: 0, text: "demo", roles: [config.role.admin]},
  {id: 11, pid: 1, text: "grid", roles: [config.role.admin], url: url("grid.html")},
  {id: 12, pid: 1, text: "form", roles: [config.role.admin], url: url("form.html")},
  {id:  2, pid: 0, text: "search engine", roles: [config.role.admin]},
  {id: 21, pid: 2, text: "bing",  roles: [config.role.admin], url: "http://www.bing.com"},
  {id: 22, pid: 2, text: "baidu", roles: [config.role.admin], url: "http://www.baidu.com"},
  {id:  3, pid: 0, text: "会员管理", roles: [config.role.admin]},
  {id: 31, pid: 3, text: "会员列表",  roles: [config.role.admin], url: url("user/list")},
  {id: 32, pid: 3, text: "身份认证资料上传",  roles: [config.role.admin], url: url("user/upload/identity")},
  {id: 33, pid: 3, text: "公司认证资料上传",  roles: [config.role.admin], url: url("user/upload/company")},
  {id: 34, pid: 3, text: "车辆认证资料上传",  roles: [config.role.admin], url: url("user/upload/car")},
  {id: 35, pid: 3, text: "签约认证资料上传",  roles: [config.role.admin], url: url("user/upload/contract")},

  {id:  8, pid: 0, text: "支付管理", roles: [config.role.admin]},
  {id: 81, pid: 8, text: "支付方式",  roles: [config.role.admin], url: url("pay/paymethod")},

  {id:  9, pid: 0, text: "帐号管理", roles: [config.role.admin]},
  {id: 91, pid: 9, text: "我的资料",  roles: [config.role.admin], url: url("user/profile")},
  {id: 91, pid: 9, text: "修改密码",  roles: [config.role.admin], url: url("user/password")}
];

module.exports = config;