(function() {
  var Search;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Search = require('./../search').Search;
  exports.Google = (function() {
    __extends(Google, Search);
    function Google() {
      this.uri = 'http://www.google.com/search?q=';
      this.pattern = '#ires ol li .r a';
      this.requiresHttp = true;
      this.trigger = 'google';
    }
    return Google;
  })();
}).call(this);
