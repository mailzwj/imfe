var cmd = require('./build');
// console.log(cmd);
require('./plugin')(cmd);

cmd.parse(process.argv);
