const SHA256 = require("crypto-js/sha256");
class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
  calculatehash() {
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
  }
  signTransaction(signingKey) {
    if (signingKey.getPublic("hex") !== this.fromAddress) {
      throw new Error("you cannot sign transactions for other wallets");
    }

    const hashTx = this.calculatehash();
    const sig = signingKey.sign(hashTx, "base64");
    this.singnature = sig.toDER("hex");
  }

  isValid() {
    if (this.singnature === null) return true;
    if (this.singnature || this.singnature.length === 0) {
      throw new Error("No signature in this transaction");
    }
    // const publicKey=
  }
}
class Block {
  constructor(timestamp, transactions, previousHash = "") {
    (this.previousHash = previousHash),
      (this.timestamp = timestamp),
      (this.transactions = transactions),
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
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }
  createGenesIsBlock() {
    return new Block(Date.parse("01/01/2022", [], "0"));
  }
  getLatesBlock() {
    return this.chain[this.chain.length - 1];
  }
  minePendingTransactions(miningRewardAddress) {
    const rewardTx = new Transaction(
      null,
      miningRewardAddress,
      this.miningReward
    );
    this.pendingTransactions.push(rewardTx);

    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log("Block succesfully mined!");
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }
  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }
  getBlanceOfAddress(address) {
    let blance = 0;
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          blance -= trans.amount;
        }
        if (trans.toAddress === address) {
          blance += trans.amount;
        }
      }
    }
    return blance;
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
module.exports.BlockChain = BlockChain;
module.exports.Transaction = Transaction;
