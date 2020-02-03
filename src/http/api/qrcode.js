import base from './base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
// import qs from 'qs' // 根据需求是否导入qs模块

const qrcode = {
  // 新闻列表
  getQRCode (msg) {
    return axios.get(`${base.luckyStar}/getQRCode?msg=` + msg)
  }
}

export default qrcode
