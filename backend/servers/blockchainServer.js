const BlockChain = require('../core/blockchain');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const bytechain = new BlockChain();
const miningTimer = 10000;

const minerBlockChainAddress = bytechain.minerBlockChainAddress;
const GenesisTransactionRecipient = '1J8uVRSxixFcRFUjKPJNRkNhTev5dpsHXi'; 

app.use(express.json())

app.get('/blockchain', (req, res) => {
    res.status(200).send(bytechain.chain);
});

app.get('/blockchain/transactions', (req, res) => {
    res.status(200).send(bytechain.transactionPool);
});

setInterval(() => {
    try {
        // const newTrx = bytechain.AddNewTransaction()
        bytechain.Mine();
        console.log('Blockchain:', bytechain.chain);
        // Be cautious with sensitive data; ensure this is safe for logging
        console.log('Balance:', bytechain.CalculateBalance(minerBlockChainAddress));
        console.log('Balance:', bytechain.CalculateBalance(GenesisTransactionRecipient));
        
    } catch (error) {
        console.error('Error during mining or balance calculation:', error);
    } 
}, miningTimer);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});