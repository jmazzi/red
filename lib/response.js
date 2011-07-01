(function() {
  var Response, klasses, parser, search, sys, xml2js;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  xml2js = require('xml2js');
  search = new (require('./search')).Search();
  sys = require('sys');
  search.addProvider('google');
  search.addProvider('youtube');
  klasses = search.klasses;
  parser = new xml2js.Parser();
  Response = function() {};
  Response.prototype = new process.EventEmitter;
  Response.prototype.parse = function(stanza, group) {
    var help, response;
    if (group == null) {
      group = false;
    }
    response = '';
    help = "google <query>\n" + "youtube <query>\n" + "yahoo <query>";
    parser.once('end', __bind(function(result) {
      var body, match, query, regex;
      body = result['body'];
      if (body != null) {
        if (group === true) {
          regex = /^red, (.*?) (.*)/;
        } else {
          regex = /^(.*?) (.*)/;
        }
        match = regex.exec(body);
        if (match != null) {
          result = match[1];
          query = match[2];
        }
        console.log(klasses);
        console.log(result);
        if (klasses[result] != null) {
          klasses[result].prototype.once('end', __bind(function(res) {
            return this.emit('end', {
              response: res,
              stanza: stanza
            });
          }, this));
          klasses[result].prototype.perform(query);
        } else {
          if (!group) {
            response = help;
          }
        }
        return this.emit('end', {
          response: response,
          stanza: stanza
        });
      }
    }, this));
    return parser.parseString(stanza.toString());
  };
  exports.Response = Response;
}).call(this);
