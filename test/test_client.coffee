{testCase} = require 'nodeunit'
{Client}   = require 'client'
require 'sinon-nodeunit'

module.exports = testCase
  setUp: (proceed) ->
    @client = new Client 'lolz@lolz.org', 'password', 'lolz'
    proceed()

  "sets @username": (test) ->
    test.equal 'lolz@lolz.org', @client.username
    test.done()

  "sets @password": (test) ->
    test.equal 'password', @client.password
    test.done()

  "sets @conference domain": (test) ->
    test.equal 'conference.lolz.org', @client.conference
    test.done()

  "addRoom() appends @rooms": (test) ->
    test.equal 0, @client.rooms.length
    @client.addRoom "room"
    test.equal 1, @client.rooms.length
    test.ok 'room' in @client.rooms
    test.done()

  "addRoom() does not appent duplicates": (test) ->
    @client.addRoom "room"
    @client.addRoom "room"
    @client.addRoom "rOom"
    test.equal 1, @client.rooms.length
    test.done()


  "fromMe() returns true when from self": (test)->
    stanza = JSON.parse '
      {
          "name": "message",
          "parent": null,
          "attrs": {
              "to": "lolz@lolz.org7ec5456",
              "type": "groupchat",
              "from": "room@conference.lolz.org/lolz",
              "xmlns:stream": "http://etherx.jabber.org/streams",
              "xmlns": "jabber:client"
          },
          "children": [
              {
                  "name": "body",
                  "parent": [
                      "Circular"
                  ],
                  "attrs": {},
                  "children": []
              }
          ]
      }
    '
    @client.addRoom 'room'
    test.ok @client.fromMe(stanza)
    test.done()

  "fromMe() returns false when not from self": (test)->
    stanza = JSON.parse '
      {
          "name": "message",
          "parent": null,
          "attrs": {
              "to": "lolz@lolz.org7ec5456",
              "type": "groupchat",
              "from": "room@conference.lolz.org/bob",
              "xmlns:stream": "http://etherx.jabber.org/streams",
              "xmlns": "jabber:client"
          },
          "children": [
              {
                  "name": "body",
                  "parent": [
                      "Circular"
                  ],
                  "attrs": {},
                  "children": []
              }
          ]
      }
    '
    @client.addRoom 'room'
    test.ok !@client.fromMe(stanza)
    test.done()
