var cmd = require('commander');
// console.log(cmd);

require('./commander')(cmd);
require('./build')(cmd);
require('./plugin')(cmd);

cmd.parse(process.argv);
