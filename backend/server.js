const BlockChain = require('./core/blockchain');
const express = require('express');
const app = express();
const port = process.env.port || 3000;

const minerBlockChainAddress = 'BlockChainminerBlockChainAddress';

const bytechain = new BlockChain(minerBlockChainAddress);
const mining_timer = 10000;

app.use(express.json())

app.get('/blockchain', (req, res) => {
    res.send(bytechain);
});

app.post('/transaction', (req, res) => {
    const amount = req.body.amount;
    const sender = req.body.sender;
    const recipient = req.body.recipient;
    bytechain.AddNewTransaction(amount, sender, recipient);

    res.json({
        message: "Transaction completed successfully"
    })
});

// app.get('./balance', ())

setInterval(() => {
    bytechain.Mine()
    console.log(bytechain);
    console.log(bytechain.CalculateBalance('040f144abd3b329eb42d17724517ca39fb4772238a5533354c7f626b654becad6c74a6ec0bb96796232c91fdb2fb5ed163b91772363608875fa86da8718140f01c'));
}, mining_timer);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});