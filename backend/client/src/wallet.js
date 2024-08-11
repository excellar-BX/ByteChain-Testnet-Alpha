const hashFunc = require('./util'); 
const crypto = require('crypto');
const base58 = require('base58');
const elliptic = require('elliptic').ec;
const ec = new elliptic('secp256k1');

const keyPair = ec.genKeyPair();

class Wallet {
    constructor() {
        this.privateKey = this.CreatePrivateKey();
        this.publicKey = this.CreatePublicKey();
        this.blockChainAddress = this.CreateBlockChainAddress();
    }

    CreatePrivateKey() {
        const privateKey = keyPair.getPrivate('hex');
        return privateKey
    }

    CreatePublicKey() {
        const publicKey = keyPair.getPublic('hex');
        returnpublic
    }

    CreateBlockChainAddress() {
        const sha256Hash = crypto.createHash('sha256').update(this.publicKey).digest();
        const ripemd160Hash = crypto.createHash('ripemd160').update(sha256Hash).digest();
        const versionByte = Buffer.from([0x00]);
        const versionedHash = Buffer.concat([versionByte, ripemd160Hash]);
        const checksum = hashFunc(versionedHash).slice(0, 4);
        const finalPayload = Buffer.concat([versionedHash, checksum]);
        const blockChainAddress = base58.encode(finalPayload);

        return blockChainAddress;
    }
}


module.exports = Wallet;