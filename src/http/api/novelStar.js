import base from '../base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
// import qs from 'qs' // 根据需求是否导入qs模块

const novelStar = {
  searchComic (comicName) {
    return axios.get(`${base.luckyStar}/novel/searchComic?comicName=${comicName}`)
  },
  starComic (comicId, comicName, starSource, starSourceCode, starImage) {
    return axios.get(`${base.luckyStar}/novel/starComic?comicId=${comicId}&comicName=${comicName}&starSource=${starSource}&starSourceCode=${starSourceCode}&starImage=${starImage}`)
  },
  qryStars () {
    return axios.get(`${base.luckyStar}/novel/qryStars`)
  },
  qryUpdateChapter () {
    return axios.get(`${base.luckyStar}/novel/qryUpdateChapter`)
  },
  qryChapter (comicId, starSourceCode) {
    return axios.get(`${base.luckyStar}/novel/qryChapter?comicId=${comicId}&starSourceCode=${starSourceCode}`)
  },
  qryChapterImages (comicId, chapterId, starSourceCode) {
    return axios.get(`${base.luckyStar}/novel/qryChapterImages?comicId=${comicId}&chapterId=${chapterId}&starSourceCode=${starSourceCode}`)
  },
  qryChapterImagesBefore (comicId, chapterId, starSourceCode) {
    return axios.get(`${base.luckyStar}/novel/qryChapterImagesBefore?comicId=${comicId}&chapterId=${chapterId}&starSourceCode=${starSourceCode}`)
  },
  qryChapterImagesAfter (comicId, chapterId, starSourceCode) {
    return axios.get(`${base.luckyStar}/novel/qryChapterImagesAfter?comicId=${comicId}&chapterId=${chapterId}&starSourceCode=${starSourceCode}`)
  },
  reloadChapterImages (comicId, chapterId, starSourceCode) {
    return axios.get(`${base.luckyStar}/novel/reloadChapterImages?comicId=${comicId}&chapterId=${chapterId}&starSourceCode=${starSourceCode}`)
  }
}

export default novelStar
