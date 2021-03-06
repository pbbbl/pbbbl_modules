
import {randomBytes} from 'crypto';
// import clean from 'clean';
const Aes = require('aes-256-gcm');
import serialize from 'serialize-javascript';
import {SerializeJSOptions} from 'serialize-javascript';
const serializeOptions:SerializeJSOptions = {
    ignoreFunction:true,
}
const delimiter = `PB13A35`;
function encrypt(decrypted:any,secret:string):string{
    if(typeof decrypted == 'undefined') throw new Error("decrypted is undefined");
    if(typeof secret != 'string' || secret == null) {
        secret = randomBytes(16).toString('hex');
    }
    const obj = {DECRYPTED:decrypted};
    let serialized:string=''
    try{
        serialized = JSON.stringify(obj);
    } catch {
        serialized =  serialize(obj, serializeOptions)
    }
    
    
    const res = Aes.encrypt(serialized,secret);
    const encrypted = `${res.ciphertext}${delimiter}${res.iv}${delimiter}${res.tag}`;
    return encrypted;
}
function decrypt(encrypted:string,secret:string):any{
    const [ciphertext,iv,tag] = encrypted.split(delimiter);
    const serialized = Aes.decrypt(ciphertext,iv,tag,secret);
    const deserialized = eval('(' + serialized + ')');
    return deserialized.DECRYPTED;
}

const createSecret = ()=>randomBytes(16).toString('hex');
const createKey = createSecret;
const createIv = randomBytes(32).toString('hex');
const randomString = (n=32)=>randomBytes(n).toString('hex');
export {
    encrypt,
    decrypt,
    createSecret,
    createKey,
    createIv,
    randomString,
    randomBytes
}
export default {
    encrypt,
    decrypt,
    createSecret,
    createKey,
    createIv,
    randomString,
    randomBytes
}
