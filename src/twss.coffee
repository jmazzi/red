
module.exports.TWSS = class TWSS

  # @subjects = "\\bs?he|it\\b"
  # @adjectives = "\\bbig|huge\\b"

  @regex = /\bs?he|it\b.*\bbig|huge\b/

  @match: (text) ->
    if text
      twss = new @(text)
      twss.check()
    else
      false

  constructor: (text) ->
    @text = text

  check: ->
    !! @text.match /\b(he|it|that)\b.*\b(big|huge)\b/ if @text?
