<template>
  <div>
    <div>Novel</div>
    <ul>
      <li><i class='icon-star-empty'></i>龙族</li>
      <li v-for="star in stars" :key="star.chapter">
        {{ star.chapter }} {{ star.href }}
      </li>
      <button @click="login()">xx</button>
    </ul>
  </div>
</template>

<script>
// import $ from 'jquery'

export default {
  name: 'Star',
  data () {
    return {
      stars: [{chapter: '第235章 致各位亲爱的读者', href: 'http://longzu5.co/post/336.html', isUpdate: 'true'}]
    }
  },
  created () {
    this.$http.get(process.env.ARIPORT_ROOT + '/qryUpdateChapter')
      .then(function (response) {
        console.log(response)
        var data = response.data
        if (data.code === 0) {
          console.log(data.data)
          console.log([data.data])
          this.stars = [data.data]
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    login () {
      let _this = this
      _this.$http.get('http://localhost:9000//login.action')
        .then(function (response) {
          console.log(response.data.data)
          _this.$store.commit('$_setToken', response.data.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
li {
  display: list-item;
  text-align: -webkit-match-parent;
}
</style>
