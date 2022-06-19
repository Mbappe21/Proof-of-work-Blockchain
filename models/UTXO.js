class UTXO {
  constructor(miner, amount) {
    this.miner = miner;
    this.amount = amount;
    this.spent = false;
  }
}


module.exports = UTXO;
