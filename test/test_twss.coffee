{testCase} = require 'nodeunit'
{TWSS}     = require 'twss'

module.exports = testCase
  setUp: (proceed) ->
    @twss = new TWSS
    @test_phrases = [
      "it is way too big"
    ]
    proceed()

  "@subjects is a valid regex": (test) ->
    words = 'he she it the shed lit'.split ' '
    test.ok t.match(@twss.subjects) for t in words
    test.done()

  "@adjectives is a valid regex": (test) ->
    words = 'big huge'.split ' '
    test.ok a.match(@twss.adjectives) for a in words
    test.done()

  "TWSS.match returns true if thats what she said": (test) ->
    test.ok TWSS.match phrase for phrase in @test_phrases
    test.done()
