(function() {
  var Response, google, googleImage, parser, search, sys, xml2js, youtube;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  xml2js = require('xml2js');
  search = require('./search');
  sys = require('sys');
  google = new search.Google();
  googleImage = new search.GoogleImage();
  youtube = new search.Youtube();
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
          sys.puts('group');
          sys.puts(body);
          regex = /^red, (.*?) (.*)/;
        } else {
          sys.puts('chat');
          regex = /^(.*?) (.*)/;
        }
        match = regex.exec(body);
        if (match != null) {
          result = match[1];
          query = match[2];
          switch (result) {
            case 'google':
              google.once('end', __bind(function(res) {
                return this.emit('end', {
                  response: res,
                  stanza: stanza
                });
              }, this));
              google.perform(query);
              break;
            case 'gi':
              googleImage.once('end', __bind(function(res) {
                return this.emit('end', {
                  response: res,
                  stanza: stanza
                });
              }, this));
              googleImage.perform(query);
              break;
            case 'youtube':
              youtube.once('end', __bind(function(res) {
                return this.emit('end', {
                  response: res,
                  stanza: stanza
                });
              }, this));
              youtube.perform(query);
              break;
            case 'yahoo':
              response = 'hhahahahahahah, wtf is a yahooo!?';
              break;
            default:
              response = help;
          }
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
