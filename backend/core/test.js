const Transaction = require('./transaction')

const privateKey = 'ca969882e7d78a474fafc8663b5284fc961f97c7d2c6b8ddd236b82962911add';
const publicKey = '04c236668e234f9ca56582cbe7a34fe92f727fbe81715f44cf82b6d13965006381d96e04abc3988c4dd16511c66e8d9ed0ed105160bd4fe857336aeed7f01178fd';
const sender = '1QBYv3k3TnBVgYqXy5yBbQYraP3rSVvame'
const recipient = '1QBYv3k3TnBVgYqXy5yBbQYraP3rSVvase'

const transaction = new Transaction(10, sender, recipient);
transaction.SignTransaction(privateKey);
const valid = transaction.IsValidTransaction(publicKey)
console.log(valid)
