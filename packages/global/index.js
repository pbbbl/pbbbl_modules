const crypto = require('crypto');
const Aes = require('aes-256-gcm');
const key = crypto.randomBytes(16).toString('hex');
const valueToEncrypt='my secret value';
const encrypted = Aes.encrypt(valueToEncrypt, key);

const decrypted = Aes.decrypt(encrypted.ciphertext,encrypted.iv,encrypted.tag,key);
const gmod = {
    name: 'global',
    key,valueToEncrypt,encrypted,decrypted
}

console.log({gmod})

const getGlobalMod = ()=>{
    console.log({gmod})
    return mod;
};
module.exports = {
    gmod,
    getGlobalMod,
    default: getGlobalMod,
}
