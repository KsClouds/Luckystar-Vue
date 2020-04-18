<template>
  <div class="TipView">
    <h1 @click="test">Tip</h1>
    <ul>
      <li>1. 双击漫画可切换章节</li>
      <li>2. ~</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tip',
  methods: {
    test () {
      Notification.requestPermission(function (status) {
        console.log(status)
        // eslint-disable-next-line no-new
        new Notification('title', {body: 'notification body'})
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.TipView ul {
  list-style-type: none;
  padding-left: 0;
}
.TipView li {
  background-color: #EEEEEE;
  padding: 10px;
  margin-top: 10px;
  position: relative;
}
</style>
