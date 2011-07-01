{testCase} = require 'nodeunit'
{Client}   = require 'client'
require 'sinon-nodeunit'

module.exports = testCase
  setUp: (proceed) ->
    @client = new Client 'lolz@lolz.org', 'password'
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