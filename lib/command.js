(function() {
  var Client, argv, demand, opt, usage;
  opt = require('optimist');
  Client = require('./client').Client;
  usage = 'Usage: red --username [username] --password [password] [--host [host]]';
  demand = ['username', 'password'];
  argv = opt.usage(usage).demand(demand).argv;
  new Client(argv.username, argv.password).connect();
}).call(this);
