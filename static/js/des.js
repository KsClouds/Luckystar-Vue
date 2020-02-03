import cryptoJs from 'crypto-js'

var key = 'Ki1055894396'
export default {
  install (Vue, options) {
    Vue.prototype.encryptDes = function (message) {
      var keyHex = cryptoJs.enc.Utf8.parse(key)
      var option = { mode: cryptoJs.mode.ECB, padding: cryptoJs.pad.Pkcs7 }
      var encrypted = cryptoJs.DES.encrypt(message, keyHex, option)
      return encrypted.ciphertext.toString()
    }
    Vue.prototype.decryptDes = function (message) {
      var keyHex = cryptoJs.enc.Utf8.parse(key)
      var decrypted = cryptoJs.DES.decrypt(
        {
          ciphertext: cryptoJs.enc.Hex.parse(message)
        },
        keyHex,
        {
          mode: cryptoJs.mode.ECB,
          padding: cryptoJs.pad.Pkcs7
        }
      )
      return decrypted.toString(cryptoJs.enc.Utf8)
    }
  }
}
