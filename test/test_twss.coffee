{testCase} = require 'nodeunit'
{TWSS}     = require 'twss'

module.exports = testCase
  setUp: (proceed) ->
    @twss = new TWSS
    @test_phrases = [
      "way too big"
    ]
    proceed()

  "@subjects is a valid regex": (test) ->
    twss = new TWSS
    words = 'he she it the shed lit'.split ' '
    test.ok t.match(twss.subjects) for t in words
    test.done()

  "@adjectives is a valid regex": (test) ->
    twss = new TWSS
    words = 'big huge'.split ' '
    test.ok a.match(twss.adjectives) for a in words
    test.done()
