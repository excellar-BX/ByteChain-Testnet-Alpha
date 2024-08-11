const sha256 = require('sha256');


// A function for giving a block it's own unique crytographic hash
function hashFunc(data) {
    const hashedData = sha256(sha256(data));
    return hashedData;
}


module.exports = hashFunc;