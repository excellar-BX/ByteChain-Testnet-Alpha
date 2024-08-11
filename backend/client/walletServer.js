// const elliptic = require('elliptic').ec;
// const ec = new elliptic('secp256k1');

const Wallet = require('./src/wallet');
const wallet = new Wallet();

// const privateKey = keyPair.getPrivate('hex');
// const keyPair = ec.keyFromPrivate(privateKey);

// const publicKey = keyPair.getPublic('hex');

// console.log('Private Key: ', privateKey);
// console.log('Public Key: ', publicKey);


console.log(wallet);
// Node.js server to manage keys and transactions
// const express = require('express');
// const app = express();

// app.use(express.json());

// app.post('/create-wallet', (req, res) => {
    
//     res.json({ privateKey, publicKey });
// });

// app.post('/sign-transaction', (req, res) => {
//     const { privateKey, message } = req.body;
//     const keyPair = ec.keyFromPrivate(privateKey);
//     const msgHash = ec.hash().update(message).digest('hex');
//     const signature = keyPair.sign(msgHash, 'hex');
//     res.json({ signature: signature.toDER('hex') });
// });

// app.post('/verify-signature', (req, res) => {
//     const { publicKey, message, signature } = req.body;
//     const keyPair = ec.keyFromPublic(publicKey, 'hex');
//     const msgHash = ec.hash().update(message).digest('hex');
//     const isValid = keyPair.verify(msgHash, signature);
//     res.json({ isValid });
// });

// app.listen(3000, () => {
//     console.log('Server running on port 3000');
// });
