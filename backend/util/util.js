const crypto = require('crypto');


/**
 * Computes a double SHA-256 hash of the input data.
 * @param {string} data - The data to be hashed.
 * @returns {string} - The hexadecimal representation of the hashed data.
 */
function hashFunc(data) {
    if (typeof data !== 'string') {
        throw new TypeError('Data must be a string.');
    }

    const hashedData = crypto.createHash('sha256').update(
        crypto.createHash('sha256').update(data).digest('hex')
    ).digest('hex');
    return hashedData;
}


/**
 * Builds a Merkle tree from an array of transactions.
 * @param {Array} transactions - An array of transaction objects.
 * @returns {string} - The Merkle root hash.
 */
function buildMerkleTree(transactions) {
    if (!Array.isArray(transactions)) {
        throw new TypeError('Transactions must be an array.');
    }

    if (transactions.length === 0) {
        return '';
    }

    if (transactions.length === 1) {
        return hashFunc(transactions[0]);
    } 

    let hashes = transactions.map(transaction => hashFunc(JSON.stringify(transaction)));

    while (hashes.length > 1) {
        if (hashes.length % 2 !== 0) {
            hashes.push(hashes[hashes.length - 1]);
        }

        let nextLevel = [];
        for (let i = 0; i < hashes.length; i += 2) {
            nextLevel.push(hashFunc(hashes[i] + hashes[i + 1]));
        }
        hashes = nextLevel;
    }
    return hashes[0];
}


module.exports = { hashFunc, buildMerkleTree };
