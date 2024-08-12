const crypto = require('crypto');
// const Base58 = require('bs58');
const elliptic = require('elliptic').ec;
const ec = new elliptic('secp256k1');
const { Base58 } = require('../../util/util.js');
const base58 = Base58();

const keyPair = ec.genKeyPair();

function hashFunc(data) {
    const hashedData = crypto.createHash('sha256').update(
        crypto.createHash('sha256').update(data).digest()
    ).digest();
    return hashedData;
}
class Wallet {
    constructor() {
        this.privateKey = this.CreatePrivateKey();
        this.publicKey = this.CreatePublicKey();
        this.blockchainAddress = this.CreateBlockChainAddress();
    }

    CreatePrivateKey() {
        const privateKey = keyPair.getPrivate('hex');
        return privateKey;
    }

    CreatePublicKey() {
        const publicKey = keyPair.getPublic('hex');
        return publicKey;
    }

    CreateBlockChainAddress() {
        const publicKeyBuffer = Buffer.from(this.publicKey, 'hex');
        const sha256Hash = crypto.createHash('sha256').update(publicKeyBuffer).digest();
        const ripemd160Hash = crypto.createHash('ripemd160').update(sha256Hash).digest();
        const versionByte = Buffer.from([0x01]);  // Testnet version byte: 0x05 for Bitcoin Testnet
        const payload = Buffer.concat([versionByte, Buffer.from(ripemd160Hash, 'hex')]);
        const checksum = hashFunc(payload).slice(0, 4);
        const finalPayload = Buffer.concat([payload, Buffer.from(checksum, 'hex')]);
        const blockchainAddress = base58.encode(finalPayload.toString('hex'));

        return blockchainAddress;
    }
}


module.exports = Wallet;