const { BlockChain, Transaction } = require("./blockChain");

let savejeeCoin = new BlockChain();
savejeeCoin.createTransaction(new Transaction("quy nhon", "tam quan", 10000));
savejeeCoin.createTransaction(new Transaction("tam quan", "quy nhon", 20000));

console.log(`\n Startin gthe miner...`);
savejeeCoin.minePendingTransactions("xaviers-address");
console.log(
  `\n Blance of xavier is `,
  savejeeCoin.getBlanceOfAddress("xaviers-address")
);

console.log(`\n Startin gthe miner agian...`);
savejeeCoin.minePendingTransactions("xaviers-address");

console.log(
  `\n Blance of xavier is `,
  savejeeCoin.getBlanceOfAddress("xaviers-address")
);

console.log(`\n Startin gthe miner agian...`);
savejeeCoin.minePendingTransactions("xaviers-address");

console.log(
  `\n Blance of xavier is `,
  savejeeCoin.getBlanceOfAddress("xaviers-address")
);
