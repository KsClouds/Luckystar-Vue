<template>
  <div class="RedView">
    <h1>Demo</h1>
    <h3>
      <a @click="showLv1" id="lv1-btn">全部</a>
      <a @click="showLv2" id="lv2-btn"></a>
      <a id="lv3-btn"></a>
    </h3>
    <!-- 第一层 -->
    <div class="lv1">
      <ul>
        <li @click="createTask">创建任务</li>
        <li @click="taskQry">待办</li>
        <li @click="taskProcess">任务进度</li>
        <li @click="userCtrl">用户管理</li>
      </ul>
    </div>
    <!-- 第二层 -->
    <div class="lv2">
      <!-- 创建任务 -->
      <ul class="task" style="display:none">
        <li @click="setTaskDetail('bidding', '招标')">招标</li>
        <li @click="setTaskDetail('audit', '审计')">审计</li>
        <li @click="setTaskDetail('engineering', '工程')">工程</li>
      </ul>
      <!-- 待办 -->
      <ul class="taskQry" style="display:none">
        <li v-for="(task, index) in tasks" :key=index @click="qryTaskProcess(task.id, task.name)">{{task.name}}</li>
      </ul>
      <!-- 任务进度 -->
      <div class="taskProcess" style="display:none">
        <button @click="showTaskProcess(0)">进行中</button>
        <button @click="showTaskProcess(1)">延迟</button>
        <button @click="showTaskProcess(2)">完成</button>
        <ul>
          <li v-for="(taskAllocatedShow, index) in taskAllocatedShows" :key=index @click="qryTaskProcess(taskAllocatedShow.id, taskAllocatedShow.name)">
          {{taskAllocatedShow.name}}
          </li>
        </ul>
      </div>
      <!-- 用户管理 -->
      <div class="userCtrl" style="display:none">
        <button @click="addUser">创建用户</button>
        <ul>
          <li v-for="(user, index) in users" :key=index>{{user.userName}}</li>
        </ul>
      </div>
    </div>
    <!-- 第三层 -->
    <div class="lv3">
      <!-- 任务进度 -->
      <div class="taskProcessDetail" style="display: none;">
        <ul>
          <App-RedTaskProcess v-for="(taskPro, index) in taskProcessList" :model="taskPro" :key="index"></App-RedTaskProcess>
        </ul>
        <button @click="showAddSubTask">添加子任务</button>
        <div class="subTaskSet" style="display:none">
          名称:<br>
          <input type="text" placeholder="请输入名称" id="subTaskSetName">
          <br>备注:<br>
          <input type="text" placeholder="请输入备注" id="subTaskSetRemarks">
          <br>负责人:<br>
          <select id="subTaskSetManager">
            <option v-for="(user, index) in users" :key="index" :value=user.userId>{{user.userName}}</option>
          </select>
          <br><br>
          <input type="submit" value="添加" @click="submitSubTaskSet">
        </div>
      </div>
      <!-- 设置任务详情 -->
      <div class="taskSet" style="display:none">
        名称:<br>
        <input type="text" name="name" placeholder="请输入名称" id="taskSetName">
        <br>备注:<br>
        <input type="text" name="remarks" placeholder="请输入备注" id="taskSetRemarks">
        <br>负责人:<br>
        <select id="taskSetManager">
          <option v-for="(user, index) in users" :key=index :value=user.userId>{{user.userName}}</option>
        </select>
        <br><br>
        <input type="submit" value="提交" @click="submitTaskSet">
      </div>
      <!-- 添加用户 -->
      <div class="addUser" style="display: none;">
        名称:<br>
        <input type="text" placeholder="请输入名称" id="addUserName">
        <br>密码:<br>
        <input type="text" placeholder="请输入密码" id="addUserPassword">
        <br><br>
        <input type="submit" value="添加" @click="createUser">
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Red',
  data () {
    return {
      // 任务类型：招标、审计、工程
      taskType: null,
      // 所有用户
      users: [],
      // 待办
      tasks: [],
      // 所有任务进度
      taskAllocated: [],
      // 用于展示的任务进度
      taskAllocatedShows: [],
      taskProcessList: [],
      parentTaskId: null
    }
  },
  created () {
    this.$api.red.qryUsers().then(res => {
      if (res.code === 0) {
        this.users = res.data
      } else {
        this.kPopup(res.msg)
      }
    })
    this.qryTasks()
    this.qryTaskAllocated()
  },
  methods: {
    qryTaskProcess (taskId, taskName) {
      this.$api.red.qryTaskProcess(taskId).then(res => {
        if (res.code === 0) {
          this.taskProcessList = res.data
          console.log(this.taskProcessList)
          $('.lv2').hide()
          $('.lv3').show()
          $('#lv3-btn').html(' - ' + taskName)
          $('.taskProcessDetail').show()
          $('.subTaskSet').hide()
          $('.addUser').hide()
          $('.taskSet').hide()
          this.parentTaskId = taskId
        } else {
          this.kPopup(res.msg)
        }
      })
    },
    createUser () {
      var userName = $('#addUserName').val()
      var password = $('#addUserPassword').val()
      var param = {
        userCode: userName,
        userName: userName,
        password: password,
        type: 'red'
      }
      this.$api.red.createUser(param).then(res => {
        if (res.code === 0) {
          this.kPopup('创建成功')
        } else {
          this.kPopup(res.msg)
        }
      })
    },
    showTaskProcess (status) {
      this.taskAllocatedShows = []
      this.taskAllocated.forEach(task => {
        if (task.status === status) {
          this.taskAllocatedShows.push(task)
        }
      })
    },
    qryTaskAllocated () {
      this.$api.red.qryTaskAllocated().then(res => {
        if (res.code === 0) {
          this.taskAllocated = res.data
          this.showTaskProcess(0)
        } else {
          this.kPopup(res.msg)
        }
      })
    },
    qryTasks () {
      this.$api.red.qryTasks().then(res => {
        if (res.code === 0) {
          this.tasks = res.data
        } else {
          this.kPopup(res.msg)
        }
      })
    },
    taskProcess () {
      $('.lv1').hide()
      $('.lv2').show()
      $('.task').hide()
      $('.taskQry').hide()
      $('.userCtrl').hide()
      $('.taskProcess').show()
      $('#lv2-btn').html(' - 任务进度')
    },
    submitSubTaskSet () {
      var name = $('#subTaskSetName').val()
      var remarks = $('#subTaskSetRemarks').val()
      var principal = $('#subTaskSetManager option:selected').val()
      var param = {
        name: name,
        principal: principal,
        remarks: remarks,
        type: 'sub',
        parentId: this.parentTaskId
      }
      this.$api.red.addTask(param).then(res => {
        if (res.code === 0) {
          this.kPopup('创建成功')
          this.qryTasks()
          this.qryTaskAllocated()
          this.qryTaskProcess(this.parentTaskId)
          $('.subTaskSet').hide()
        } else {
          this.kPopup(res.msg)
        }
      })
    },
    submitTaskSet () {
      var name = $('#taskSetName').val()
      var remarks = $('#taskSetRemarks').val()
      var principal = $('#taskSetManager option:selected').val()
      var param = {
        name: name,
        principal: principal,
        remarks: remarks,
        type: this.taskType
      }
      this.$api.red.addTask(param).then(res => {
        if (res.code === 0) {
          this.kPopup('创建成功')
          this.qryTasks()
          this.qryTaskAllocated()
        } else {
          this.kPopup(res.msg)
        }
      })
    },
    showLv1 () {
      $('.lv1').show()
      $('.lv2').hide()
      $('.lv3').hide()
      $('#lv2-btn').html('')
      $('#lv3-btn').html('')
    },
    showLv2 () {
      $('.lv1').hide()
      $('.lv2').show()
      $('.lv3').hide()
      $('#lv3-btn').html('')
    },
    createTask () {
      $('.lv1').hide()
      $('.lv2').show()
      $('#lv2-btn').html(' - 创建任务')
      $('.task').show()
      $('.taskQry').hide()
      $('.userCtrl').hide()
      $('.taskProcess').hide()
    },
    taskQry () {
      $('.lv1').hide()
      $('.lv2').show()
      $('#lv2-btn').html(' - 待办')
      $('.task').hide()
      $('.taskQry').show()
      $('.userCtrl').hide()
      $('.taskProcess').hide()
    },
    userCtrl () {
      $('.lv1').hide()
      $('.lv2').show()
      $('#lv2-btn').html(' - 用户管理')
      $('.userCtrl').show()
      $('.task').hide()
      $('.taskQry').hide()
      $('.taskProcess').hide()
    },
    setTaskDetail (taskType, taskTypeName) {
      $('.lv2').hide()
      $('.lv3').show()
      $('#lv3-btn').html(' - ' + taskTypeName)
      $('.taskSet').show()
      $('.addUser').hide()
      $('.taskProcessDetail').hide()
      this.taskType = taskType
    },
    addUser () {
      $('.lv2').hide()
      $('.lv3').show()
      $('#lv3-btn').html(' - ' + '添加用户')
      $('.addUser').show()
      $('.taskProcessDetail').hide()
      $('.taskSet').hide()
    },
    showAddSubTask () {
      $('.subTaskSet').show()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.RedView a {
  color: #0000FF;
  text-decoration: underline;
}
h1, h2 {
  font-weight: normal;
}
.RedView ul {
  list-style-type: none;
  padding-left: 0;
}
.RedView li {
  background-color: #EEEEEE;
  padding: 10px;
  margin-top: 10px;
  position: relative;
}
</style>
