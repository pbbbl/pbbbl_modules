import Cookies from 'js-cookie'
import store2 from 'store2';
import {createSecret,encrypt,decrypt} from 'aes';
import clean from 'clean';
let secret:string|undefined = Cookies.get('__pbbbl_storage_sc');
if(!secret){
    secret = createSecret();
    Cookies.set('__pbbbl_storage_sc',secret,{
        expires: 365,
        secure: false,
        sameSite: 'strict'
    });
}

type Options = {secure?:boolean; expires?:boolean|number;};

function save(key:string,value:any,options:Options={
    secure: false,
    expires: false
}):{saved:boolean; secret: string|null; expires: number | false; secure: boolean|null }{
    if(!options.secure){
        options.secure = false;
    }
    if(!options.expires){
        options.expires = false;
    }

    let $value = clean({VALUE:value},{configId:'json'});
    if(options.secure){
        const encryptedValue = encrypt($value,secret);
        $value = encryptedValue;
    }
    const saved = {
        saved: true,
        storageProvider: 'pbbbl-storage',
        key: key,
        value: $value,
        secure: options.secure,
        ts: new Date().getTime(),
        expires: options.expires
    }
    store2.set(key,saved);
    return {
        saved: true,
        secret: options.secure ? secret : null,
        expires: options.expires,
        secure: options.secure
    }

}
function load(key:string,defaultValue:any,options:Options={secure:false,expires:false}):unknown{
    let loaded = store2.get(key);
    const now = new Date().getTime();
    if(!loaded){
        if( typeof defaultValue != 'undefined' && defaultValue){

            save(key,defaultValue,options);
            return load(key,defaultValue,options);
        } else {
            return null
        }
    } else {

        let {saved,storageProvider,key,value,secure,ts,expires} = loaded;
        let VALUE;
        if(expires && expires < now ){
            store2.remove(key);
            return load(key,defaultValue,options);
        } else {
            if(secure){
                const decrypted = decrypt(value,secret);
                VALUE = decrypted.VALUE;
            } else {
                VALUE = value.VALUE;
            }
            return VALUE;
        }
    }
}
function remove(key:string):void{
    const exists = store2.has(key);
    if(exists){
        store2.remove(key);
        return;
    } else {
        return;
    }

}
export default {
    save,
    load,
    remove
}
