<template>
  <div class="novel">
    <div id="novelList">
      <ul>
        <li v-for="novel in novels" :key="novel.novelName" @click="qryChapter(novel.url)">
          {{novel.novelName}}
        </li>
      </ul>
    </div>
    <div id="novelChapterList" style="display: none;">
      <div>龙族-5</div>
      <ul>
        <li v-for="chapter in chapters" :key="chapter.chapter" @click="qryChapterContent(chapter.url)">
          {{ chapter.chapter }}
        </li>
      </ul>
    </div>
    <div id="novelChapterContent" style="display: none;">
      <div>{{chapter.title}}</div>
      <div>{{chapter.updateDate}}</div>
      <pre>{{chapter.content}}</pre>
      <ul>
        <li @click="qryChapterContent(chapter.beforeChapterUrl)">上一章：{{chapter.beforeChapterName}}</li>
        <li @click="qryChapterContent(chapter.afterChapterUrl)">下一章：{{chapter.afterChapterName}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Novel',
  data () {
    return {
      novels: [],
      chapters: [],
      chapter: {}
    }
  },
  created () {
    var _this = this
    _this.$api.novel.qryNovel().then(res => {
      if (res.code === 0) {
        _this.novels = res.data
      } else {
        _this.kPopup(res.msg)
      }
    })
  },
  methods: {
    qryChapter (url) {
      var _this = this
      var param = {novelUrl: url}
      _this.$api.novel.qryChapter(param).then(res => {
        if (res.code === 0) {
          _this.chapters = res.data
          $('#novelList').hide()
          $('#novelChapterList').show()
        } else {
          _this.kPopup(res.msg)
        }
      })
    },
    qryChapterContent (url) {
      if (url == null) {
        return
      }
      var _this = this
      var param = {
        chapterUrl: url
      }
      _this.$api.novel.qryChapterContent(param).then(res => {
        if (res.code === 0) {
          _this.chapter = res.data
          document.scrollingElement.scrollTop = 0
          $('#novelChapterList').hide()
          $('#novelChapterContent').show()
        } else {
          _this.kPopup(res.msg)
        }
      })
    }
  }
}
</script>

<style>
.novel li {
  background-color: #EEEEEE;
  padding: 10px;
  margin-top: 10px;
  position: relative;
}
.novel ul {
  list-style-type: none;
  padding-left: 0;
}
#novelChapterContent pre {
  white-space:pre-wrap; /* css3.0 */
  white-space:-moz-pre-wrap; /* Firefox */
  white-space:-pre-wrap; /* Opera 4-6 */
  white-space:-o-pre-wrap; /* Opera 7 */
  word-wrap:break-word; /* Internet Explorer 5.5+ */
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Noto Sans CJK SC,WenQuanYi Micro Hei,Arial,sans-serif;
}
</style>
