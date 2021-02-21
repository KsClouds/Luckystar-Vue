<template>
  <li>
    <template v-if="model.name!=null">
      任务名称：{{model.name}} <br>
      任务状态：
      <template v-if="model.status===0">进行中</template>
      <template v-else-if="model.status===1">完成</template>
      <template v-else>延迟</template>
      <br>
    </template>
    备注：{{model.remarks}} <br>
    创建时间：{{model.createTime}}
    <ul>
      <App-RedTaskProcess v-for="(model, index) in model.subProcessList" :model="model" :key="index">
      </App-RedTaskProcess>
    </ul>
  </li>
</template>

<script>
export default {
  props: ['model'],
  name: 'redTaskProcess',
  data () {
    return {}
  },
  created () {
    console.log(this.model)
  }
}
</script>

<style>
</style>
