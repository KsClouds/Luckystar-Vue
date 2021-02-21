import base from '../base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例

const red = {
  qryUsers () {
    return axios.get(`${base.luckyStar}/red/user`)
  },
  addTask (param) {
    return axios.post(`${base.luckyStar}/red/task`, param)
  },
  qryTasks () {
    return axios.get(`${base.luckyStar}/red/task`)
  },
  qryTaskAllocated () {
    return axios.get(`${base.luckyStar}/red/task/allocated`)
  },
  createUser (param) {
    return axios.post(`${base.luckyStar}/user/add`, param)
  },
  qryTaskProcess (taskId) {
    return axios.get(`${base.luckyStar}/red/process/${taskId}`)
  }
}

export default red
