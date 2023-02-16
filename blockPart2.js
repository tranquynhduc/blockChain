const SHA256 = require("crypto-js/sha256");
class Block {
  constructor(index, timestamp, data, previousHash = "") {
    (this.index = index),
      (this.timestamp = timestamp),
      (this.data = data),
      (this.previousHash = previousHash),
      (this.hash = this.calculatehash());
    this.nonce = 0;
  }
  calculatehash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }
  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) != Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculatehash();
    }
    console.log("block mined " + this.hash);
  }
}
class BlockChain {
  constructor() {
    this.chain = [this.createGenesIsBlock()];
    this.difficulty = 4;
  }
  createGenesIsBlock() {
    return new Block(0, "01/01/2017", "Genesis Block", "0");
  }
  getLatesBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatesBlock().hash;
    newBlock.mineBlock(this.difficulty);
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
console.log("mining block ...1");
savejeeCoin.addBlock(new Block(1, "21/02/2000", { amount: 4 }));
console.log("mining block ...2");
savejeeCoin.addBlock(new Block(2, "21/02/1997", { amount: 40 }));
console.log("mining block ...3");
savejeeCoin.addBlock(new Block(3, "21/12/2004", { amount: 80 }));
