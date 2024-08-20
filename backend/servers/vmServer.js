const VM = require('../vm/virtualMachine'); 

const express = require('express');
const { default: axios } = require('axios');

const app = express();
const port = process.env.PORT || 3010

app.post('/create-new-contract', async (req, res) => {
    const { code, sender, publicKey, privateKey } = req.body;

    if (!code || !sender) {
        res.status(400).json({
            message: 'Please provide all required fields'
        })
    }

    const contract = new VM(code, sender);
    contract.SignContract(privateKey);


    const contReq = { code, publicKey }

    try {
        const response = await axios.post('http://localhost:3000/add-new-contract', contReq)
        console.log(`Contract sent sucessfully \n BlockChain server responded with ${response.data}`);

        res.status(201).json({ message: 'Contract sent successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Contract not sent: ', error: error.message });
    }
});


app.use(port, () => {
    console.log(`Server listening on port ${port}`)
})