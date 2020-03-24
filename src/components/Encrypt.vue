<template>
  <div>
    <div>
      <div>
        <span style="vertical-align:top;">入参：</span>
        <textarea id="preInfo" rows="3" cols="20" wrap="soft" style="width: 817px;height: 265px;margin-top: 7px;"></textarea>
      </div>
      <div style="margin-left: 80px;">
        <a @click="decrypt()">解密</a>&nbsp;
        <a @click="encrypt()">加密</a>&nbsp;&nbsp;
        <button @click="copyResp()">复制出参</button>
      </div>
    </div>
    <div id="resInfo2">
        <span style="vertical-align:top">出参：</span>
        <textarea id="resInfo" rows="3" cols="20" wrap="soft" style="width: 817px;height: 265px;margin-top: 7px;"></textarea>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import cryptoJs from 'crypto-js'
let keyOne = 'iamasiainfocoder'

export default {
  name: 'Encrypt',
  methods: {
    encrypt () {
      var word = $('#preInfo').val()
      let key = cryptoJs.enc.Utf8.parse(keyOne)
      let enc = ''
      if (typeof word === 'string') {
        word = cryptoJs.enc.Utf8.parse(word)
        enc = cryptoJs.AES.encrypt(word, key, {
          mode: cryptoJs.mode.ECB,
          padding: cryptoJs.pad.Pkcs7
        })
      } else if (typeof word === 'object') {
        let data = JSON.stringify(word)
        enc = cryptoJs.AES.encrypt(data, key, {
          mode: cryptoJs.mode.ECB,
          padding: cryptoJs.pad.Pkcs7
        })
      }
      let decryptedInfo = enc.toString()
      $('#resInfo').val(decryptedInfo)
    },
    decrypt () {
      var word = $('#preInfo').val()
      if (word.indexOf('ai|') === 0) {
        word = word.substring(3, word.length)
      }
      let key = cryptoJs.enc.Utf8.parse(keyOne)
      let dec = cryptoJs.AES.decrypt(word, key, {
        mode: cryptoJs.mode.ECB,
        padding: cryptoJs.pad.Pkcs7
      })
      var decryptedInfo = cryptoJs.enc.Utf8.stringify(dec)
      $('#resInfo').val(decryptedInfo)
    },
    copyResp () {
      var Url2 = document.getElementById('resInfo')
      Url2.select()
      document.execCommand('Copy')
    }
  }
}
</script>

<style>
</style>
