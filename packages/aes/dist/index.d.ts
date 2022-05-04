/// <reference types="node" />
import { randomBytes } from 'crypto';
declare function encrypt(decrypted: any, secret: string): string;
declare function decrypt(encrypted: string, secret: string): any;
declare const createSecret: () => string;
declare const createKey: () => string;
declare const createIv: string;
declare const randomString: (n?: number) => string;
export { encrypt, decrypt, createSecret, createKey, createIv, randomString, randomBytes };
declare const _default: {
    encrypt: typeof encrypt;
    decrypt: typeof decrypt;
    createSecret: () => string;
    createKey: () => string;
    createIv: string;
    randomString: (n?: number) => string;
    randomBytes: typeof randomBytes;
};
export default _default;
