define([
  'footer/views/footer'
],

function(FooterView) {
  var Footer = function() {
    this.views.footer = new FooterView();
    this.views.footer.render();
  };

  Footer.prototype = {
    views: {}
  };

  return Footer;
});