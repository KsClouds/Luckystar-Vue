<template>
  <div>
    <div>Novel</div>
    <ul>
      <li><i class='icon-star-empty'></i>龙族</li>
      <li v-for="star in stars" :key="star.chapter">
        {{ star.chapter }} {{ star.href }}
      </li>
    </ul>
  </div>
</template>

<script>
// import $ from 'jquery'
// import encryptDes from '../../static/js/des.js'

export default {
  name: 'Star',
  data () {
    return {
      stars: []
    }
  },
  created () {
    let _this = this
    _this.$api.star.qryUpdateChapter().then(res => {
      console.log(res)
      if (res == null) {
        alert('查询失败')
        return
      }
      if (res.code === 0) {
        _this._self.stars = res.data
      } else {
        alert(res.msg)
      }
    })
  },
  methods: {
  }
}
</script>

<style>
li {
  display: list-item;
  text-align: -webkit-match-parent;
}
</style>
