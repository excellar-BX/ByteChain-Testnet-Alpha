const BlockChain = require('../core/blockchain');
const Transaction = require('../core/transaction');
const Wallet = require('../client/wallet');
const express = require('express');
const { default: axios } = require('axios');
const app = express();
const port = process.env.PORT || 3001;



const bytechain = new BlockChain();
const wallet = new Wallet();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/create-new-wallet', (req, res) => {
    const privateKey = wallet.privateKey;
    const publicKey = wallet.publicKey;
    const blockchainAddress = wallet.blockchainAddress;

    res.status(201).json({
        message: 'Do not share your private key with anyone, but to receive any transaction share your blockchain address',
        privateKey, 
        publicKey, 
        blockchainAddress
    });
});

app.post('/check-balance', (req, res) => {
    const { publicKey } = req.body;

    if (!publicKey) {
        return res.status(400).json({
            message: 'Public key is required.'
        });
    }

    if (publicKey !== wallet.CreateBlockChainAddress()) {
        res.status(400).json({ message: 'Please provide a valid public key' })
    }

    const balance = bytechain.CalculateBalance(publicKey)
    res.status(200).json({ message: `Your balance is ${balance}`})
});

app.post('/create-transaction', async (req, res) => {
    const { amount, sender, recipient, privateKey, publicKey } = req.body;

    if (!amount || !sender || !recipient || !privateKey || !publicKey) {
        res.status(400).json({
            message: 'Please provide all required fields'
        })
    }

    const transaction = new Transaction(amount, sender, recipient);
    transaction.SignTransaction(privateKey);

    const trxReq = { transaction, publicKey }

    try {
        const response = await axios.post('http://localhost:3000/add-new-transaction', trxReq)
        console.log(`Transaction completed sucessfully \n BlockChain server responded with ${response.data}`);

        res.status(201).json({ message: 'Transaction completed successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Transaction failed', error: error.message });
    }
});

//                                           TODO
// app.post('/create-new-contract', (req, res) => {
//     //creating new contract logic
//     //<TODO></TODO>
//     res.status(201).json({ message: 'Contract added to blockchain successfully' })
// });


app.listen(port, () => {
    console.log('Server running on port 3001');
});
