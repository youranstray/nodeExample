var clgg = window.clgg = window.clgg || {};

(function($) {
  if($.validator){
    $.validator.addMethod("loggedin", function(value, element, params) {
      return this.optional(element) || !$.isEmptyObject(clgg.user);
    },'请先登录系统');
    
    $.validator.addMethod("username", function(value, element, params) {
      return this.optional(element) || /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/.test(value) || /^0?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/.test(value);
    },'用户名为11位手机号码或由字母开头、数字和下划线组成的3~16个字符串');

    $.validator.addMethod("mobile", function(value, element, params) {
      return this.optional(element) || /^0?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/.test(value);
    },'请输入正确格式的手机号码');
    
    $.validator.addMethod("phone", function(value, element, params) {
      return this.optional(element) || /^0?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/.test(value) || /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/.test(value);
    },'请输入正确格式的电话或手机号码');

    $.validator.addMethod("password", function(value, element, params) {
      return this.optional(element) || /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/.test(value);
    },'密码由字母开头、数字和下划线组成的6~16个字符串');
  }
})(jQuery);