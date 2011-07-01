sys      = require 'sys'
xmpp     = require 'node-xmpp'
res      = require('./response').Response
response = new res

exports.Client = class Client
  constructor: (username, password, nickname) ->
    @username = username
    @password = password
    @nickname = nickname
    @conference = "conference.#{username.split('@')[1]}"
    @rooms    = []

  connect: ->
    cl = new xmpp.Client jid: @username, password: @password
    response.on 'end', (reply) =>
      stanza = reply.stanza
      res    = reply.response
      if stanza? and res?
        group  = reply.stanza.attrs.type == 'groupchat'
        if group == true
          room = stanza.attrs.from.split('/')[0]
          sys.puts room
          msg = new xmpp.Element('message', {to: room, type: 'groupchat'}).c('body').t(res)
        else
          msg = new xmpp.Element('message', {to: stanza.attrs.from, type: 'chat'}).c('body').t(res)
        cl.send msg

    cl.on 'online', =>
      cl.send(new xmpp.Element 'presence', {type: 'available'}).
      c('show').t('chat').up().c('status').t('Happily echoing your <message/> stanzas')
      for room in @rooms
        element = new xmpp.Element 'presence', { to: "#{room}@#{@conference}/#{@nickname}" }
        element.c('x', { xmlns: 'http://jabber.org/protocol/muc' })
        cl.send element

    cl.on 'stanza', (stanza) =>
      if stanza.is('message') and stanza.attrs.type != 'error' and !@fromMe(stanza)
        switch stanza.attrs.type
          when 'chat'
            response.parse stanza
          when 'groupchat'
            response.parse stanza, true
          else
            sys.puts stanza.attrs.type

    cl.on 'error', (e) =>
      sys.puts e

  addRoom: (room) ->
    @rooms.push room

  fromMe: (stanza) ->
    for room in @rooms
      if stanza.attrs.from == "#{room}@#{@conference}/#{@nickname}"
        return true
    false