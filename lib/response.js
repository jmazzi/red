(function() {
  var Response, TWSS, google, googleImage, parser, search, sys, twitter, xml2js, youtube;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  xml2js = require('xml2js');
  search = require('./search');
  sys = require('sys');
  TWSS = require('./twss').TWSS;
  google = new search.Google();
  googleImage = new search.GoogleImage();
  youtube = new search.Youtube();
  twitter = new search.Twitter();
  parser = new xml2js.Parser();
  Response = function() {};
  Response.prototype = new process.EventEmitter;
  Response.prototype.parse = function(stanza, group) {
    var help, response;
    if (group == null) {
      group = false;
    }
    response = '';
    help = "google <query>\n" + "youtube <query>\n" + "yahoo <query>\n" + "twitter <query>\n";
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
            case 'twitter':
              twitter.once('end', __bind(function(res) {
                return this.emit('end', {
                  response: res,
                  stanza: stanza
                });
              }, this));
              twitter.perform(query);
              break;
            default:
              if (TWSS.match(body)) {
                response = "That's, what she said ... that's, what she said.";
              } else if (!group) {
                response = help;
              }
          }
        } else {
          if (TWSS.match(body)) {
            response = "That's, what she said ... that's, what she said.";
          } else if (!group) {
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
