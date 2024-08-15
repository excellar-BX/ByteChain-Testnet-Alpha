const BlockChain = require('../core/blockchain');
const express = require('express');
const app = express();
//const cors = require('cors'); TODO

const port = process.env.PORT || 3000;

const bytechain = new BlockChain();
const miningTimer = 10000;

// app.use(cors()); TODO
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/blockchain', (req, res) => {
    res.status(200).send(bytechain.chain);
});

app.get('/blockchain/transactions', (req, res) => {
    res.status(200).send(bytechain.transactionPool);
});

//                                             TODO
// app.get('/blockchain/blockchain_address', (req, res) => {
    
//     res.status(200).send({
//         blockChainAddress: blockChainAddress,
//         balance: bytechain.CalculateBalance(blockChainAddress),
//         allTransactions: bytechain.AllTransactionsMade(blockChainAddress)
//     });
// });

setInterval(() => {
    try {
        bytechain.Mine();
        console.log('Blockchain:', bytechain.chain);
    } catch (error) {
        console.error('Error during Mining:', error);
    } 
}, miningTimer);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});