(function() {
  var cl, password, res, response, sys, username, xmpp;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  sys = require('sys');
  xmpp = require('node-xmpp');
  res = require('./response').Response;
  response = new res;
  username = 'you@jabber.org';
  password = 'pw';
  cl = new xmpp.Client({
    jid: username,
    password: password
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
  cl.on('error', function() {
    return sys.puts(e);
  });
}).call(this);
