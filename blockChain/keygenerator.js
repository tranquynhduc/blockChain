const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const key = ec.genKeyPair();
const publicKey = key.getPublic("hex");
const privatekey = key.getPrivate("hex");

console.log();
console.log("privatekey: ", privatekey);

console.log();
console.log("publicKey: ", publicKey);
