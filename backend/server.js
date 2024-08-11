const BlockChain = require('./core/blockchain');
const express = require('express');
const app = express();
const port = 3000;

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

app.post('/create-wallet', (req, res) => {
    const keyPair = ec.genKeyPair();
    const privateKey = keyPair.getPrivate('hex');
    const publicKey = keyPair.getPublic('hex');
    res.json({ privateKey, publicKey });
});

app.post('/sign-transaction', (req, res) => {
    
});

app.post('/verify-signature', (req, res) => {
    const { publicKey, message, signature } = req.body;
    const keyPair = ec.keyFromPublic(publicKey, 'hex');
    const msgHash = ec.hash().update(message).digest('hex');
    const isValid = keyPair.verify(msgHash, signature);
    res.json({ isValid });
});

// app.get('./balance', ())

// setInterval(() => {
//     bytechain.Mine()
//     console.log(bytechain);
// }, mining_timer);

app.listen(port, () => {
    log(`Server listening on port ${port}`)
});