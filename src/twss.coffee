
module.exports.TWSS = class TWSS

  @subjects = ///\b
    s?he|it
  \b///

  @adjectives = ///\b
    big|huge
  \b///

  @match: (text) ->
    twss = new @(text)
    twss.check()

  constructor: (text) ->
    @text = text

  check: ->
    @text.match(@subjects) && @text.match(@adjectives)
