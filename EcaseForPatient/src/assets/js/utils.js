import Vue from 'vue'

import CryptoJS from 'crypto-js'

export default {

/**

* @param {*需要加密的字符串 注：对象转化为json字符串再加密} word

* @param {*aes加密需要的key值，这个key值后端同学会告诉你} keyStr

*/

encrypt (word, keyStr) { // 加密
const iv = CryptoJS.enc.Utf8.parse('1234567887654321'); 
 var key = CryptoJS.enc.Utf8.parse(keyStr)
 var srcs = CryptoJS.enc.Utf8.parse(word)
var encrypted = CryptoJS.AES.encrypt(srcs, key, {iv: iv,mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7}) // 加密模式为ECB，补码方式为PKCS5Padding（也就是PKCS7）
//var base64 = CryptoJS.enc.Base64.stringify(encrypted);
return encrypted.toString()

},

decrypt (word, keyStr) { // 解密
    //console.log(keyStr)
const iv = CryptoJS.enc.Utf8.parse('1234567887654321');
var key = CryptoJS.enc.Utf8.parse(keyStr)
//console.log(key)
//var srcs = CryptoJS.enc.Utf8.parse(word)
var decrypt = CryptoJS.AES.decrypt(word, key, {iv: iv,mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7})
// 解密

    
return decrypt.toString(CryptoJS.enc.Utf8)

}

}
