{EventEmitter} = require "events"
request        = require 'request'
jsdom          = require 'jsdom'
jq             = __dirname +  '/../lib/jquery-1.5.min.js'


class Search extends EventEmitter
  constructor: ->
    @linkPrefix   = ''
    @requiresHttp = false
    @uri          = ''
    @pattern      = ''
  perform: (text) ->
    query = encodeURIComponent text
    results = ''
    request {uri: @uri + query }, (error, response, body) =>
      if !error? && response.statusCode == 200
        jQueryURI = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js'
        jsdom.env body, [jQueryURI], (errors, window) =>
          $ = window.$
          $(@pattern).each (i, lmn) =>
            href  = $(lmn).attr('href')
            title = $(lmn).text()
            if @linkPrefix?
              href = @linkPrefix + href
            link = "#{title} - #{href}"
            if @requiresHttp?
              if /^http/.exec  $(lmn).attr('href')
                results = results + link + "\n"
            else
              results = results + link + "\n"
          @emit 'end', results

class exports.Google extends Search
  constructor: ->
    @uri          = 'http://www.google.com/search?q='
    @pattern      = '#ires ol li .r a'
    @requiresHttp = true

class exports.GoogleImage extends Search
  constructor: ->
    @uri          = 'http://images.google.com/search?tbm=isch&biw=1140&bih=983&q='
    @pattern      = '#ires ol li .rg .rg_ctlv'
    @requiresHttp = true

class exports.Youtube extends Search
  constructor: ->
    @uri          = 'http://www.youtube.com/results?search_query='
    @pattern      = '#search-results h3 a'
    @linkPrefix   = 'http://www.youtube.com'
