var clgg = window.clgg = window.clgg || {};
require([
  'footer/app'
],

function(App) {
  clgg.footer = new App();
});