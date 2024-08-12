const crypto = require('crypto');
const bs58 = require('bs58');
const elliptic = require('elliptic').ec;
const ec = new elliptic('secp256k1');

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
        const versionByte = Buffer.from([0x00]);
        const versionedHash = Buffer.concat([versionByte, ripemd160Hash]);
        const checksum = hashFunc(versionedHash).slice(0, 4);
        const finalPayload = Buffer.concat([versionedHash, checksum]);
        const blockchainAddress = bs58.encode(finalPayload);

        return blockchainAddress;
    }
}

const wallet = new Wallet()
console.log(wallet.CreateBlockChainAddress())

module.exports = Wallet;