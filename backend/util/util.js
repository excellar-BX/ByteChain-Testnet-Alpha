const crypto = require('crypto');


// A function for giving a block it's own unique crytographic hash
function hashFunc(data) {
    const hashedData = crypto.createHash('sha256').update(
        crypto.createHash('sha256').update(data).digest('hex')
    ).digest('hex');
    return hashedData;
}

function Base58() {
    const Base58Alphabets = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    // Function to convert a given binary number to Base58
    function encode(binary) {
        let encoded = '';
        let i = binary.length - 1;
        let carry = parseInt(binary[i], 2);

        while (carry > 0 || i >= 0) {
            carry = Math.floor(carry / 58);
            encoded = Base58Alphabets[carry % 58] + encoded;
            i--;
        }
        return encoded;
    }

    // Function to convert a given Base58 encoded string to binary
    function decode(base58) {
        let decoded = '';
        let i = base58.length - 1;
        let carry = parseInt(base58[i], 58);
        while (carry > 0 || i >= 0) {
            carry = Math.floor(carry / 256);
            decoded = carry.toString(2) + decoded;
            i--;
        }
        return decoded;
    }

    return {encode, decode};    
}


module.exports = {hashFunc, Base58};