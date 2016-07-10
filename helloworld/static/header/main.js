var clgg = window.clgg = window.clgg || {};
require([
  'header/app'
],

function(App) {
  clgg.header = new App();
});