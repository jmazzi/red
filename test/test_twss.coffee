{testCase} = require 'nodeunit'
{TWSS}     = require 'twss'

module.exports = testCase
  setUp: (proceed) ->
    @twss = new TWSS
    proceed()

  # "@subjects is a valid regex": (test) ->
  #   words = 'he she it the shed lit'.split ' '
  #   test.ok t.match(@twss.subjects) for t in words
  #   test.done()

  # "@adjectives is a valid regex": (test) ->
  #   words = 'big huge'.split ' '
  #   test.ok Ta.match(@twss.adjectives) for a in words
  #   test.done()

  "TWSS.match returns true if thats what she said": (test) ->
    phrases = [
      "it is way too big"
      'it is bigger'
    ]
    test.ok TWSS.match phrase for phrase in phrases
    test.done()

  "TWSS.match returns false if thats not what she said": (test) ->
    phrases = [
      'shed is big'
    ]
    test.ok ! TWSS.match phrase for phrase in phrases
    test.done()
