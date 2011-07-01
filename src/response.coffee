xml2js  = require 'xml2js'
search  = new (require './search').Search()
sys     = require 'sys'

# google        = new search.Google()
# googleImage   = new seyoutubeoogleImage()
# youtube       = new search.Youtube()
search.addProvider 'google'
search.addProvider 'youtube'

klasses  = search.klasses
parser   = new xml2js.Parser()


Response = ->
Response.prototype = new process.EventEmitter
Response.prototype.parse = (stanza, group = false) ->
  response = ''
  help     = "google <query>\n" +
             "youtube <query>\n" +
             "yahoo <query>"
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

      console.log klasses
      console.log result
      if klasses[result]?
        klasses[result]::once 'end', (res) =>
          @emit 'end', {response: res, stanza: stanza}
        klasses[result]::perform query
      else
        if !group
          response = help

      #   switch result
      #     when 'google'
      #       google.once 'end', (res) =>
      #         @emit 'end', {response: res, stanza: stanza}
      #       google.perform query
      #     when 'gi'
      #       googleImage.once 'end', (res) =>
      #         @emit 'end', {response: res, stanza: stanza}
      #       googleImage.perform query
      #     when 'youtube'
      #       youtube.once 'end', (res) =>
      #         @emit 'end', {response: res, stanza: stanza}
      #       youtube.perform query
      #     when 'yahoo'
      #       response = 'hhahahahahahah, wtf is a yahooo!?'
      #     else
      #       response = help
      # else
      #   if !group
      #     response = help
      @emit 'end', {response: response, stanza: stanza}
  parser.parseString stanza.toString()

exports.Response = Response
