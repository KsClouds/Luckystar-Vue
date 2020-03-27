import base from './base'
import axios from '../http'
import qs from 'qs'

const novel = {
  qryNovel () {
    return axios.post(`${base.luckyStar}/novel/qryNovel`)
  },
  qryChapter (param) {
    return axios.post(`${base.luckyStar}/novel/qryChapter`, qs.stringify(param))
  },
  qryChapterContent (param) {
    return axios.post(`${base.luckyStar}/novel/qryChapterContent`, qs.stringify(param))
  }
}

export default novel
