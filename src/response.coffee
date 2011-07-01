xml2js  = require 'xml2js'
search  = require './search'
sys     = require 'sys'
{TWSS}  = require './twss'

google        = new search.Google()
googleImage   = new search.GoogleImage()
youtube       = new search.Youtube()
twitter       = new search.Twitter()
parser        = new xml2js.Parser()


Response = ->
Response.prototype = new process.EventEmitter
Response.prototype.parse = (stanza, group = false) ->
  response = ''
  help     = "google <query>\n" +
             "youtube <query>\n" +
             "yahoo <query>\n" +
             "twitter <query>\n"
  parser.once 'end', (result) =>
    body = result['body']
    if body?
      if group == true
        regex = /^red, (.*?) (.*)/
      else
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
          when 'twitter'
            twitter.once 'end', (res) =>
              @emit 'end', {response: res, stanza: stanza}
            twitter.perform query
          else
            if TWSS.match body
              response = "That's, what she said ... that's, what she said."
            else if !group
              response = help
      else
        if TWSS.match body
          response = "That's, what she said ... that's, what she said."
        else if !group
          response = help

      @emit 'end', {response: response, stanza: stanza}
  parser.parseString stanza.toString()

exports.Response = Response
