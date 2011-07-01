
module.exports.TWSS = class TWSS

  @subjects = /\bs?he|it\b/

  @adjectives = /\bbig|huge\b/

  @match: (text) ->
    twss = new @(text)
    twss.check()

  constructor: (text) ->
    @text = text

  check: ->
    false
