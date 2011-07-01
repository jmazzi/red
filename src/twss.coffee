
module.exports.TWSS = class TWSS

  @match: (text) ->
    if text
      twss = new @(text)
      twss.check()
    else
      false

  constructor: (text) ->
    @text = text

  check: ->
    !! @text.match /\b(he|it|that)\b.*\b(big(ger)?|huger?)\b/ if @text?
