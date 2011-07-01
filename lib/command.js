(function() {
  var Client, argv, demand, opt, usage;
  opt = require('optimist');
  Client = require('./client').Client;
  usage = 'Usage: red --username <user@jabber.org> --password <secret>';
  demand = ['username', 'password'];
  argv = opt.usage(usage).demand(demand).argv;
  new Client(argv.username, argv.password).connect();
}).call(this);
