const sha256 = require('sha256');

// Function prototype
function Blockchain() {
  this.chain = [];
  this.pendingTransactions = [];

  // Create genesis block
  this.createNewBlock('This is Agenesis block with nounce of 0', '0', '0');
}

// Function to create a new block
Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transactions: this.pendingTransactions,
    nonce: nonce,
    hash: hash,
    previousBlockHash: previousBlockHash,
  };

  this.pendingTransactions = [];
  this.chain.push(newBlock);

  return newBlock;
};

// Return last block
Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
};

// Create a new transaction
Blockchain.prototype.createNewTransaction = function (amount, paymentId, studentId, sessionId) {
  const newPayment = {
    amount: amount,
    paymentId: paymentId,
    studentId: studentId,
    sessionId: sessionId,
  };
  this.pendingTransactions.push(newPayment);
  return this.getLastBlock().index + 1;
};

// SHA256 hashing to hash our block data
Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
  const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
  const hash = sha256(dataAsString);
  return hash;
};

// Proof of work
Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
  let nonce = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  while (hash.substring(0, 4) !== '0000') {
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  }
  return nonce;
};

// Enable export of blockchain constructor function
module.exports = Blockchain;
