(function() {
  var EventEmitter, jq, jsdom, request;
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
  exports.Search = (function() {
    __extends(Search, EventEmitter);
    function Search() {
      this.linkPrefix = '';
      this.requiresHttp = false;
      this.uri = '';
      this.pattern = '';
      this.trigger = null;
      this.klasses = {};
    }
    Search.prototype.perform = function(text) {
      var query, results;
      query = encodeURIComponent(text);
      results = '';
      return request({
        uri: this.uri + query
      }, __bind(function(error, response, body) {
        var jQueryURI;
        if (!(error != null) && response.statusCode === 200) {
          jQueryURI = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js';
          return jsdom.env(body, [jQueryURI], __bind(function(errors, window) {
            var $;
            $ = window.$;
            $(this.pattern).each(__bind(function(i, lmn) {
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
    Search.prototype.addProvider = function(klass) {
      var k, name;
      if (this.klasses[klass] == null) {
        name = klass.charAt(0).toUpperCase() + klass.slice(1);
        console.log("" + __dirname + "/search/" + klass);
        k = new require("" + __dirname + "/search/" + klass)[name];
        return this.klasses[klass] = k;
      }
    };
    return Search;
  })();
}).call(this);
