const readlineSync = require('readline-sync');
const Blockchain = require('./blockchain');

// Create a new blockchain instance
const bitcoin = new Blockchain();

// Main menu function
function mainMenu() {
  console.log('\nBlockchain CLI\n');
  console.log('1. Create new payments');
  console.log('2. Mine a new block');
  console.log('3. View the blockchain');
  console.log('4. Exit');

  const choice = readlineSync.question('Enter your choice: ');

  switch (choice) {
    case '1':
      createNewPayments();
      break;
    case '2':
      mineNewBlock();
      break;
    case '3':
      viewBlockchain();
      break;
    case '4':
      process.exit(0);
      break;
    default:
      console.log('Invalid choice, please try again.');
      mainMenu();
      break;
  }
}

// Create new payments
function createNewPayments() {
  let morePayments = true;

  while (morePayments) {
    const amount = readlineSync.question('Enter the amount: ');
    const paymentId = readlineSync.question('Enter the payment ID: ');
    const studentId = readlineSync.question('Enter the student ID: ');

    bitcoin.createNewTransaction(amount, paymentId, studentId);
    console.log('Payment created successfully!');

    const more = readlineSync.question('Do you want to add another payment? (yes/no): ');
    if (more.toLowerCase() !== 'yes') {
      morePayments = false;
    }
  }

  mainMenu();
}

// Mine a new block
function mineNewBlock() {
  if (bitcoin.pendingTransactions.length === 0) {
    console.log('No pending transactions to mine.');
    mainMenu();
    return;
  }

  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock.hash;
  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock.index + 1,
  };
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
  const hash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, hash);

  console.log('New block mined successfully!');
  console.log(newBlock);
  mainMenu();
}

// View the blockchain
function viewBlockchain() {
  console.log(JSON.stringify(bitcoin, null, 2));
  mainMenu();
}

// Start the CLI
mainMenu();
