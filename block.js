const SHA256 = require("crypto-js/sha256");
class Block {
  constructor(index, timestamp, data, previousHash = "") {
    (this.index = index),
      (this.timestamp = timestamp),
      (this.data = data),
      (this.previousHash = previousHash),
      (this.hash = this.calculatehash());
  }
  calculatehash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}
class BlockChain {
  constructor() {
    this.chain = [this.createGenesIsBlock()];
  }
  createGenesIsBlock() {
    return new Block(0, "01/01/2017", "Genesis Block", "0");
  }
  getLatesBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatesBlock().hash;
    newBlock.hash = newBlock.calculatehash();
    this.chain.push(newBlock);
  }
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculatehash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}
let savejeeCoin = new BlockChain();
savejeeCoin.addBlock(new Block(1, "21/02/2000", { amount: 4 }));
savejeeCoin.addBlock(new Block(2, "21/02/1997", { amount: 40 }));
savejeeCoin.addBlock(new Block(3, "21/12/2004", { amount: 80 }));
savejeeCoin.isChainValid();
console.log(JSON.stringify(savejeeCoin, "0", 5));
console.log(savejeeCoin.isChainValid());
