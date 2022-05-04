declare function encrypt(decrypted: any, secret: string): string;
declare function decrypt(encrypted: string, secret: string): any;
export { encrypt, decrypt, };
