// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require underscore
//= require json2
//= require handlebars-v1.1.2.js
//= require backbone
//= require meme_canvas
//= require ./app/app
//= require_tree ./app/models
//= require_tree ./app/collections
//= require_tree ./app


$(function(){
  Backbone.View.prototype.close = function() {
    if (this.onClose) {
        this.onClose();
    }
    this.remove();
  };

  var memeRouter = new App.Routers.MemeRouter();
  Backbone.history.start();  
})
