'use strict';

/* Import dependencies */
import CryptoJS from "crypto-js";

/* Import custom JS */
export class Hash{
    constructor(){
        this.secret = 'codegen';
        this.message = 'Hello Everyone';
        this.hash = {};
        this.size = {};
    }
    encrypt(){

        this.hash.MD5           = CryptoJS.MD5(this.message, this.secret).toString();
        this.size.MD5           = this.hash.MD5.length;

        this.hash.HmacMD5       = CryptoJS.HmacMD5(this.message, this.secret).toString();
        this.size.HmacMD5       = this.hash.HmacMD5.length;

        return this;

        // return ciphertext.toString();
        // // Decrypt
        // var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), this.secret);
        // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        // return plaintext;
    }
    decrypt(){

    }
}
