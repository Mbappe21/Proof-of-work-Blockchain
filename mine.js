const Block = require('./models/Block');
const Transaction = require('./models/Transaction');
const UTXO = require('./models/UTXO');
const db = require('./db');
const TARGET_DIFFICULTY = BigInt("0x000" + "F".repeat(61));
const BLOCK_REWARD=5;
let balance=BLOCK_REWARD;

const publicKey0="0x695C5e3C0aD4Ba695481e575Ec8c2EA78F295421"
const publicKey1="0x354029eFfc22291C5B69789f2eec8d3C627385c4"
const publicKey2="0x095f34A60f8AeC65EF3CeCde9A1Ef7FEF08c12A5"

class Miner{
  constructor(publicKey){
    this.publicKey=publicKey;
    this.balance=0;
  }
}
let miner0 = new Miner(publicKey0);
let miner1 = new Miner(publicKey1);
let miner2 = new Miner(publicKey2);

var miners=[publicKey0, publicKey1, publicKey2];



let mining = true;
mine();

function startMining() {
  mining = true;
  mine();
}

function stopMining() {
  mining = false;
}

function mine() {
  if(!mining) return;

  const block = new Block();

  let selectedMiner=miners[Math.floor(Math.random()*miners.length)];

  const coinbaseUTXO = new UTXO(selectedMiner, BLOCK_REWARD);

  if(selectedMiner===publicKey0){
    miner0.balance=miner0.balance+balance
  }else if(selectedMiner===publicKey1){
    miner1.balance=miner1.balance+balance
  }else{
    miner2.balance=miner2.balance+balance
  };

  const coinbaseTX = new Transaction([], [coinbaseUTXO]);
  block.addTransaction(coinbaseTX);

  while(BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY) {
    block.nonce++;
  }

console.log("    ");
console.log(block.transactions[0]);
  block.execute();

  db.blockchain.addBlock(block);

  console.log(" ");
  console.log(`Mined block #${db.blockchain.blockHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`);
  console.log("miner0's Balance: "+ miner0.balance);
  console.log("Miner1's Balance: "+ miner1.balance);
  console.log("Miner2's Balance: "+ miner2.balance);
  setTimeout(mine, 5000);
}

module.exports = {
  startMining,
  stopMining,
};
