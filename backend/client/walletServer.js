const BlockChain = require('../core/blockchain');
const Wallet = require('./src/wallet');
const express = require('express');
const app = express();
const port = process.env.port || 3001;



const bytechain = new BlockChain();
const wallet = new Wallet();

app.use(express.json());

app.get('/create-new-wallet', (req, res) => {
    const privateKey = wallet.privateKey;
    const publicKey = wallet.publicKey;
    const blockchainAddress = wallet.blockchainAddress;

    res.status(201).json({
        privateKey, 
        publicKey, 
        blockchainAddress, 
        message: 'Do not share your private key with anyone, but to receive any transaction share your blockchain address' 
    });
});

app.post('/check-balance', (req, res) => {
    const publicKey = req.body;
    const balance = bytechain.CalculateBalance(publicKey)
    res.status(200).json({ message: `Your balance is ${balance}`})
})

app.post('/create-new-transaction', (req, res) => {
    const { amount, sender, recipient } = req.body;
    bytechain.AddNewTransaction(amount, sender, recipient);

    res.status(201).json({ message: 'Transaction completed successfully' })
});

app.post('/create-new-contract', (req, res) => {
    const { code, sender } = req.body;
    // bytechain.AddNewTransaction(amount, sender, recipient);

    res.status(201).json({ message: 'Contract added to blockchain successfully' })
});


app.listen(port, () => {
    console.log('Server running on port 3001');
});
