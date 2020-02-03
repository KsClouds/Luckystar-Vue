import base from './base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
// import qs from 'qs' // 根据需求是否导入qs模块

const star = {
  // 新闻列表
  qryUpdateChapter () {
    return axios.get(`${base.luckyStar}/qryUpdateChapter`)
  },
  qryChapter (comic) {
    return axios.get(`${base.luckyStar}/qryChapter?comic=${comic}`)
  },
  qryChapterImages (comic, chapterId) {
    return axios.get(`${base.luckyStar}/qryChapterImages?comic=${comic}&chapterId=${chapterId}`)
  },
  qryChapterImagesBefore (comic, chapterId) {
    return axios.get(`${base.luckyStar}/qryChapterImagesBefore?comic=${comic}&chapterId=${chapterId}`)
  },
  qryChapterImagesAfter (comic, chapterId) {
    return axios.get(`${base.luckyStar}/qryChapterImagesAfter?comic=${comic}&chapterId=${chapterId}`)
  }
}

export default star
