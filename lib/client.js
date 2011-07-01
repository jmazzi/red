(function() {
  var Client, res, response, sys, xmpp;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  sys = require('sys');
  xmpp = require('node-xmpp');
  res = require('./response').Response;
  response = new res;
  exports.Client = Client = (function() {
    function Client(username, password) {
      this.username = username;
      this.password = password;
      this.connect();
    }
    Client.prototype.connect = function() {
      var cl;
      cl = new xmpp.Client({
        jid: this.username,
        password: this.password
      });
      response.on('end', __bind(function(reply) {
        var stanza;
        stanza = reply.stanza;
        res = reply.response;
        if ((stanza != null) && (res != null)) {
          return cl.send(new xmpp.Element('message', {
            to: stanza.attrs.from,
            type: 'chat'
          }).c('body').t(res));
        }
      }, this));
      cl.on('online', function() {
        return cl.send(new xmpp.Element('presence', {})).c('show').t('chat').up().c('status').t('Happily echoing your <message/> stanzas');
      });
      cl.on('stanza', function(stanza) {
        if (stanza.is('message') && stanza.attrs.type !== 'error') {
          return response.parse(stanza);
        }
      });
      return cl.on('error', function(e) {
        return sys.puts(e);
      });
    };
    return Client;
  })();
}).call(this);
