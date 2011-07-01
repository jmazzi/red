(function() {
  var Client, res, response, sys, xmpp;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  sys = require('sys');
  xmpp = require('node-xmpp');
  res = require('./response').Response;
  response = new res;
  exports.Client = Client = (function() {
    function Client(username, password, nickname) {
      this.username = username;
      this.password = password;
      this.nickname = nickname;
      this.conference = "conference." + (username.split('@')[1]);
      this.rooms = [];
    }
    Client.prototype.connect = function() {
      var cl;
      cl = new xmpp.Client({
        jid: this.username,
        password: this.password
      });
      response.on('end', __bind(function(reply) {
        var group, msg, room, stanza;
        stanza = reply.stanza;
        res = reply.response;
        if ((stanza != null) && (res != null)) {
          group = reply.stanza.attrs.type === 'groupchat';
          if (group === true) {
            room = stanza.attrs.from.split('/')[0];
            msg = new xmpp.Element('message', {
              to: room,
              type: 'groupchat'
            }).c('body').t(res);
          } else {
            msg = new xmpp.Element('message', {
              to: stanza.attrs.from,
              type: 'chat'
            }).c('body').t(res);
          }
          return cl.send(msg);
        }
      }, this));
      cl.on('online', __bind(function() {
        var element, room, _i, _len, _ref, _results;
        cl.send(new xmpp.Element('presence', {
          type: 'available'
        })).c('show').t('chat').up().c('status').t('Happily echoing your <message/> stanzas');
        _ref = this.rooms;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          room = _ref[_i];
          element = new xmpp.Element('presence', {
            to: "" + room + "@" + this.conference + "/" + this.nickname
          });
          element.c('x', {
            xmlns: 'http://jabber.org/protocol/muc'
          });
          _results.push(cl.send(element));
        }
        return _results;
      }, this));
      cl.on('stanza', __bind(function(stanza) {
        if (stanza.is('message') && stanza.attrs.type !== 'error' && !this.fromMe(stanza)) {
          switch (stanza.attrs.type) {
            case 'chat':
              return response.parse(stanza);
            case 'groupchat':
              return response.parse(stanza, true);
          }
        }
      }, this));
      return cl.on('error', __bind(function(e) {
        return sys.puts(e);
      }, this));
    };
    Client.prototype.addRoom = function(room) {
      return this.rooms.push(room);
    };
    Client.prototype.fromMe = function(stanza) {
      var room, _i, _len, _ref;
      _ref = this.rooms;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        room = _ref[_i];
        if (stanza.attrs.from === ("" + room + "@" + this.conference + "/" + this.nickname)) {
          return true;
        }
      }
      return false;
    };
    return Client;
  })();
}).call(this);
