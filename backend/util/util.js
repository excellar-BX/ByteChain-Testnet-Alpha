const crypto = require('crypto');


// A function for giving a block it's own unique crytographic hash
function hashFunc(data) {
    const hashedData = crypto.createHash('sha256').update(
        crypto.createHash('sha256').update(data).digest()
    ).digest();
    return hashedData;
}


module.exports = hashFunc;