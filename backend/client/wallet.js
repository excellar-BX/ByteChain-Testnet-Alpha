const crypto = require('crypto');
const bs58 = require('bs58').default;
const elliptic = require('elliptic').ec;
const ec = new elliptic('secp256k1');

function hashFunc(data) {
    const hashedData = crypto.createHash('sha256').update(
        crypto.createHash('sha256').update(data).digest()
    ).digest();
    return hashedData;
}
class Wallet {
    constructor() {
        this.privateKey = ec.genKeyPair().getPrivate('hex');
        this.publicKey = this.CreatePublicKey(this.privateKey);
        this.blockchainAddress = this.CreateBlockChainAddress(this.publicKey);
    }

    CreatePublicKey(privateKey) {
        const keyPair = ec.keyFromPrivate(privateKey)
        const publicKey = keyPair.getPublic('hex');
        return publicKey;
    }

    CreateBlockChainAddress(publicKey) {
        const publicKeyBuffer = Buffer.from(publicKey, 'hex');
        const sha256Hash = crypto.createHash('sha256').update(publicKeyBuffer).digest();
        const ripemd160Hash = crypto.createHash('ripemd160').update(sha256Hash).digest();
        const versionByte = Buffer.from([0x00]);
        const payload = Buffer.concat([versionByte, ripemd160Hash]);
        const checksum = Buffer.from(hashFunc(payload)).slice(0, 4);
        const finalPayload = Buffer.concat([payload, checksum]);
        const blockchainAddress = bs58.encode(finalPayload);
        
        return blockchainAddress;
    }
}


module.exports = Wallet;