<template>
  <div>
    <div id='doupolist'>
      <div>斗破苍穹</div>
      <div>目录</div>
      <ul>
        <li v-for="chapter in chapters" :key="chapter.chapterId" @click="openChapter(chapter.chapterId)">
          {{ chapter.chapter_id }} {{ chapter.title }}
        </li>
      </ul>
    </div>
    <div id='doupochapter' style="display: none;">
      <div class='header'>
        <a @click='beforeChapter()'>上一话（快捷键←）</a><br>
        <a @click='afterChapter()'>下一话（快捷键→）</a>
      </div>
      <div v-for="chapterImg in chapterImgs" :key="chapterImg.id">
        <img :src="chapterImg.src">
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Doupo',
  data () {
    return {
      chapters: [],
      chapterImgs: [],
      curChapter: 0
    }
  },
  created () {
    let _this = this
    _this.$api.star.qryDoupoChapter().then(res => {
      if (res == null) {
        alert('查询失败')
      }
      console.log(res.data)
      _this._self.chapters = res.data
    })

    document.onkeydown = function (e) {
      // 事件对象兼容
      let e1 = e || event || window.event
      // 键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
      if (e1 && e1.keyCode === 37) {
        _this.beforeChapter()
      } else if (e1 && e1.keyCode === 39) {
        _this.afterChapter()
      }
    }
  },
  methods: {
    openChapter (chapterId) {
      let _this = this
      _this._self.curChapter = chapterId
      $('#doupolist').hide()
      $('#doupochapter').show()
      _this.$api.star.qryDoupoChapterImages(chapterId).then(res => {
        _this._self.chapterImgs = res.data.data
        console.log(_this._self.chapterImgs)
      })
    },
    beforeChapter () {
      let _this = this
      var curChapterId = _this._self.curChapter
      _this.$api.star.qryDoupoChapterImagesBefore(curChapterId).then(res => {
        _this._self.chapterImgs = res.data.data
        this._self.curChapter = res.data.chapterId
      })
      document.scrollingElement.scrollTop = 0
    },
    afterChapter () {
      let _this = this
      var curChapterId = _this._self.curChapter
      _this.$api.star.qryDoupoChapterImagesAfter(curChapterId).then(res => {
        _this._self.chapterImgs = res.data.data
        this._self.curChapter = res.data.chapterId
      })
      document.scrollingElement.scrollTop = 0
    }
  }
}
</script>

<style>

.header {
  height: 50px;
  width: 200px;
  position: fixed;
  top: 0;
  right: 0;
  font-family: "微软雅黑";
  z-index: 1000;
  padding-top:61px
}
</style>
