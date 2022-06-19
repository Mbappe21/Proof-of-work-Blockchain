const jayson = require('jayson');
const {startMining} = require('./mine');
const {utxos} = require('./db');

const PORT = 3032;


const server = jayson.server({
  startMining: function(_, callback) {
    callback(null, 'success!');
    startMining();
  }
});
console.log(" ");
server.http().listen(PORT);
