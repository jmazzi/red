{rawData} = require './twss_data'

exports.TWSS = class TWSS
  constructor: ->
    @db = rawData.split("\n")

