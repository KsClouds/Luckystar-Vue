<template>
  <div>
    <div id='comicList'>
      <ul>
        <li @click="chooseComic('DouPoCangQiong')">斗破苍穹</li>
        <li @click="chooseComic('WuDongQianKun')">武动乾坤</li>
        <li @click="chooseComic('DaZhuZai')">大主宰</li>
      </ul>
    </div>
    <div id='chapterList' style="display: none;">
      <div>斗破苍穹</div>
      <div>目录</div>
      <ul>
        <li v-for="chapter in chapters" :key="chapter.chapterId" @click="openChapter(chapter.chapterId)">
          {{ chapter.chapter_id }} {{ chapter.title }}
        </li>
      </ul>
    </div>
    <div id='chapter' style="display: none;">
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
      comic: null,
      chapters: [],
      chapterImgs: [],
      curChapter: 0
    }
  },
  created () {
    let _this = this
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
    chooseComic (comic) {
      let _this = this
      _this._self.comic = comic
      _this.$api.star.qryChapter(comic).then(res => {
        if (res == null) {
          alert('查询失败')
        }
        console.log(res.data)
        _this._self.chapters = res.data
        $('#comicList').hide()
        $('#chapterList').show()
      })
    },
    openChapter (chapterId) {
      let _this = this
      _this._self.curChapter = chapterId
      $('#chapterList').hide()
      $('#chapter').show()
      _this.$api.star.qryChapterImages(_this._self.comic, chapterId).then(res => {
        _this._self.chapterImgs = res.data.data
        console.log(_this._self.chapterImgs)
      })
    },
    beforeChapter () {
      let _this = this
      var curChapterId = _this._self.curChapter
      _this.$api.star.qryChapterImagesBefore(_this._self.comic, curChapterId).then(res => {
        _this._self.chapterImgs = res.data.data
        this._self.curChapter = res.data.chapterId
      })
      document.scrollingElement.scrollTop = 0
    },
    afterChapter () {
      let _this = this
      var curChapterId = _this._self.curChapter
      _this.$api.star.qryChapterImagesAfter(_this._self.comic, curChapterId).then(res => {
        _this._self.chapterImgs = res.data.data
        this._self.curChapter = res.data.chapterId
      })
      document.scrollingElement.scrollTop = 0
    }
  }
}
</script>

<style>
#comicList li {
  margin: 10px;
}
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
