{Search} = require('./../search')

class exports.Google extends Search
  constructor: ->
    @uri          = 'http://www.google.com/search?q='
    @pattern      = '#ires ol li .r a'
    @requiresHttp = true
    @trigger      = 'google'

