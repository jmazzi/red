opt      = require 'optimist'
sys      = require 'sys'
{Client} = require './client'

usage  = 'Usage: red --username [username] --password [password] --nickname [nickname] [--host [host] --rooms [room1,room2]]'
demand = ['username', 'password', 'nickname']
argv   = opt.usage(usage).demand(demand).argv

client = new Client(argv.username, argv.password, argv.nickname)

if argv.rooms?
  rooms = argv.rooms.split(',')
  client.addRoom room for room in rooms

client.connect()