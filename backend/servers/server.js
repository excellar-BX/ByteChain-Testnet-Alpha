const BlockChain = require('../core/blockchain');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const minerBlockChainAddress = 'BlockChainminerBlockChainAddress';

const bytechain = new BlockChain(minerBlockChainAddress);
const miningTimer = 10000;

app.use(express.json())

app.get('/blockchain', (req, res) => {
    res.send(bytechain.chain);
});

app.post('/transaction', (req, res) => {
    res.send(bytechain.transactionPool);
});

setInterval(() => {
    try {
        bytechain.Mine();
        console.log('Blockchain:', bytechain.chain);
        // Be cautious with sensitive data; ensure this is safe for logging
        console.log('Balance:', bytechain.CalculateBalance(minerBlockChainAddress));
    } catch (error) {
        console.error('Error during mining or balance calculation:', error);
    } 
}, miningTimer);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});