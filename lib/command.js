(function() {
  var Client, argv, client, demand, opt, room, rooms, sys, usage, _i, _len;
  opt = require('optimist');
  sys = require('sys');
  Client = require('./client').Client;
  usage = 'Usage: red --username <user@jabber.org> --password <secret> --nickname <nickname> [--rooms <room1,room2>]';
  demand = ['username', 'password', 'nickname'];
  argv = opt.usage(usage).demand(demand).argv;
  client = new Client(argv.username, argv.password, argv.nickname);
  if (argv.rooms != null) {
    rooms = argv.rooms.split(',');
    for (_i = 0, _len = rooms.length; _i < _len; _i++) {
      room = rooms[_i];
      client.addRoom(room);
    }
  }
  client.connect();
}).call(this);
