{Search} = require('./../search')

class exports.Youtube extends Search
  constructor: ->
    @uri          = 'http://www.youtube.com/results?search_query='
    @pattern      = '#search-results h3 a'
    @linkPrefix   = 'http://www.youtube.com'
    @trigger      = 'youtube'
