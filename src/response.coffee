xml2js  = require 'xml2js'
search  = require './search'
sys     = require 'sys'

google        = new search.Google()
googleImage  = new search.GoogleImage()
youtube       = new search.Youtube()
parser        = new xml2js.Parser()


Response = ->
Response.prototype = new process.EventEmitter
Response.prototype.parse = (stanza) ->
  response = ''
  help     = "google <query>\n" +
             "youtube <query>\n" +
             "yahoo <query>"
  parser.once 'end', (result) =>
    body = result['body']
    if body?
      regex = /^(.*?) (.*)/
      match = regex.exec body
      if match? 
        result = match[1]
        query = match[2]
        switch result
          when 'google'
            google.once 'end', (res) =>
              @emit 'end', {response: res, stanza: stanza}
            google.perform query
          when 'gi'
            googleImage.once 'end', (res) =>
              @emit 'end', {response: res, stanza: stanza}
            googleImage.perform query
          when 'youtube'
            youtube.once 'end', (res) =>
              @emit 'end', {response: res, stanza: stanza}
            youtube.perform query
          when 'yahoo'
            response = 'hhahahahahahah, wtf is a yahooo!?'
          else
            response = help
      else
        response = help
      @emit 'end', {response: response, stanza: stanza}
  parser.parseString stanza.toString()

exports.Response = Response
