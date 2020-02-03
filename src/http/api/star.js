import base from './base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
// import qs from 'qs' // 根据需求是否导入qs模块

const star = {
  // 新闻列表
  qryUpdateChapter () {
    return axios.get(`${base.luckyStar}/qryUpdateChapter`)
  },
  qryDoupoChapter () {
    return axios.get(`${base.luckyStar}/qryDoupoChapter`)
  },
  qryDoupoChapterImages (chapterId) {
    return axios.get(`${base.luckyStar}/qryDoupoChapterImages?chapterId=${chapterId}`)
  },
  qryDoupoChapterImagesBefore (chapterId) {
    return axios.get(`${base.luckyStar}/qryDoupoChapterImagesBefore?chapterId=${chapterId}`)
  },
  qryDoupoChapterImagesAfter (chapterId) {
    return axios.get(`${base.luckyStar}/qryDoupoChapterImagesAfter?chapterId=${chapterId}`)
  }
}

export default star
