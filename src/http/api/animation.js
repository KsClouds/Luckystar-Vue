import base from '../base'
import axios from '../http'

const animation = {
  qryAnimations () {
    return axios.get(`${base.luckyStar}/qryAnimations`)
  },
  qryAnimationChapters (animationId) {
    return axios.get(`${base.luckyStar}/qryAnimationChapters?animationId=${animationId}`)
  }
}

export default animation
