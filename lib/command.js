(function() {
  var Client, argv, config, demand, opt, usage;
  opt = require('optimist');
  Client = require('./client').Client;
  usage = 'Usage: red --username [username] --password [password] [--host [host]]';
  demand = ['username', 'password'];
  argv = opt.usage(usage).demand(demand).argv;
  config = {
    jid: argv.username,
    password: argv.password
  };
  if (argv.host != null) {
    config.host = argv.host;
  }
  Client.connect(config);
}).call(this);
