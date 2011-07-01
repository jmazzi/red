{EventEmitter} = require "events"
request        = require 'request'
jsdom          = require 'jsdom'
jq             = __dirname +  '/../lib/jquery-1.5.min.js'


class exports.Search extends EventEmitter
  constructor: ->
    @linkPrefix   = ''
    @requiresHttp = false
    @uri          = ''
    @pattern      = ''
    @trigger      = null
    @klasses      = {}

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

  addProvider: (klass) ->
    unless @klasses[klass]?
      name = klass.charAt(0).toUpperCase() + klass.slice(1)
      k = new require("#{__dirname}/search/#{klass}")[name]
      @klasses[klass] = k
