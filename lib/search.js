(function() {
  var EventEmitter, Search, jq, jsdom, request;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  EventEmitter = require("events").EventEmitter;
  request = require('request');
  jsdom = require('jsdom');
  jq = __dirname + '/../lib/jquery-1.5.min.js';
  Search = (function() {
    __extends(Search, EventEmitter);
    function Search() {
      this.linkPrefix = '';
      this.requiresHttp = false;
      this.uri = '';
      this.pattern = '';
    }
    Search.prototype.perform = function(text) {
      var query, results;
      query = encodeURIComponent(text);
      results = '';
      return request({
        uri: this.uri + query
      }, __bind(function(error, response, body) {
        var window;
        if (!(error != null) && response.statusCode === 200) {
          window = jsdom.jsdom(body).createWindow();
          return jsdom.jQueryify(window, jq, __bind(function(window, jquery) {
            var $;
            $ = window.$;
            jquery(this.pattern).each(__bind(function(i, lmn) {
              var href, link, title;
              href = $(lmn).attr('href');
              title = $(lmn).text();
              if (this.linkPrefix != null) {
                href = this.linkPrefix + href;
              }
              link = "" + title + " - " + href;
              if (this.requiresHttp != null) {
                if (/^http/.exec($(lmn).attr('href'))) {
                  return results = results + link + "\n";
                }
              } else {
                return results = results + link + "\n";
              }
            }, this));
            return this.emit('end', results);
          }, this));
        }
      }, this));
    };
    return Search;
  })();
  exports.Google = (function() {
    __extends(Google, Search);
    function Google() {
      this.uri = 'http://www.google.com/search?q=';
      this.pattern = '#ires ol li .r a';
      this.requiresHttp = true;
    }
    return Google;
  })();
  exports.GoogleImage = (function() {
    __extends(GoogleImage, Search);
    function GoogleImage() {
      this.uri = 'http://images.google.com/search?tbm=isch&biw=1140&bih=983&q=';
      this.pattern = '#ires ol li .rg .rg_ctlv';
      this.requiresHttp = true;
    }
    return GoogleImage;
  })();
  exports.Youtube = (function() {
    __extends(Youtube, Search);
    function Youtube() {
      this.uri = 'http://www.youtube.com/results?search_query=';
      this.pattern = '#search-results h3 a';
      this.linkPrefix = 'http://www.youtube.com';
    }
    return Youtube;
  })();
}).call(this);
