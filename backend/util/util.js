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


module.exports = hashFunc;
