sys      = require 'sys'
xmpp     = require 'node-xmpp'
res      = require('./response').Response
response = new res

exports.Client = class Client
  constructor: (username, password) ->
    @username = username
    @password = password
    @connect()

  connect: ->
    cl = new xmpp.Client jid: @username, password: @password
    response.on 'end', (reply) =>
      stanza = reply.stanza
      res = reply.response
      if stanza? and res?
        cl.send new xmpp.Element('message', {to: stanza.attrs.from, type: 'chat'}).c('body').t(res)

    cl.on 'online', ->
      cl.send(new xmpp.Element 'presence', {}).
      c('show').t('chat').up().c('status').t('Happily echoing your <message/> stanzas')

    cl.on 'stanza', (stanza) ->
      if stanza.is('message') && stanza.attrs.type != 'error'
        response.parse stanza

    cl.on 'error', (e) ->
      sys.puts e
