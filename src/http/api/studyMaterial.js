import base from '../base'
import axios from '../http'
import qs from 'qs'

const studyMaterial = {
  qryClassification () {
    return axios.post(`${base.luckyStar}/study_material/qryClassification`)
  },
  qryTitle (param) {
    return axios.post(`${base.luckyStar}/study_material/qryTitle`, qs.stringify(param))
  },
  qryContent (param) {
    return axios.post(`${base.luckyStar}/study_material/qryContent`, qs.stringify(param))
  }
}

export default studyMaterial
