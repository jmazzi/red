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
  exports.Youtube = (function() {
    __extends(Youtube, Search);
    function Youtube() {
      this.uri = 'http://www.youtube.com/results?search_query=';
      this.pattern = '#search-results h3 a';
      this.linkPrefix = 'http://www.youtube.com';
      this.trigger = 'youtube';
    }
    return Youtube;
  })();
}).call(this);
