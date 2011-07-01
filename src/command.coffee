opt      = require 'optimist'
{Client} = require './client'

usage  = 'Usage: red --username [username] --password [password] [--host [host]]'
demand = ['username', 'password']
argv   = opt.usage(usage).demand(demand).argv

config      = jid: argv.username, password: argv.password
config.host = argv.host if argv.host?

Client.connect config
