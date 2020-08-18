<template>
  <div id="animationView">
<!--    动漫列表-->
    <div id="animationList">
      <a>动漫</a>
      <div class="search-animation-list">
        <div v-for="animation in animations" :key="animation.animationId" class="common-animation-item"
             @click="openChapter(animation.animationId, animation.animationName)">
          <a class="cover">
            <img :src=animation.animationImage alt="封面加载失败">
          </a>
          <p class="animation__title">{{ animation.animationName }}</p>
        </div>
      </div>
    </div>
<!--    章节列表-->
    <div id="animationChapterList" style="display: none;">
      <div>
        <a @click="backToAnimationList()">动漫</a>&nbsp;-&nbsp;{{ animationName }}&nbsp;-{{chapterName}}
      </div>
      <video id="animationVideo" controls autoplay @ended="nextChapter()"></video>
      <ul>
        <li v-for="animationChapter in animationChapters" :key="animationChapter.animationChapterId"
            @click="openAnimation(animationChapter.source, animationChapter.animationChapterName)">
          {{ animationChapter.animationChapterName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Animation',
  data () {
    return {
      animations: [],
      animationName: '',
      chapterName: '',
      index: 0,
      animationChapters: []
    }
  },
  created () {
    var _this = this
    _this.$api.animation.qryAnimations().then(res => {
      if (res.code === 0) {
        _this.animations = res.data
      } else {
        _this.kPopup(res.msg)
      }
    })
  },
  methods: {
    nextChapter () {
      var _this = this
      var video = $('#animationVideo')
      var length = _this.animationChapters.length
      if (_this.index !== length - 1) {
        var chapter = _this.animationChapters[++_this.index]
        video.attr('src', chapter.source)
        _this.chapterName = chapter.animationChapterName
      }
    },
    openChapter (animationChapterId, animationName) {
      var _this = this
      _this.$api.animation.qryAnimationChapters(animationChapterId).then(res => {
        if (res.code === 0) {
          _this.animationChapters = res.data
          $('#animationVideo').attr('src', res.data[0].source)
          $('#animationList').hide()
          $('#animationChapterList').show()
          _this.animationName = animationName
          _this.chapterName = res.data[0].animationChapterName
        } else {
          _this.kPopup(res.msg)
        }
      })
    },
    openAnimation (source, chapterName) {
      $('#animationVideo').attr('src', source)
      this.chapterName = chapterName
    },
    backToAnimationList () {
      document.getElementById('animationVideo').pause()
      $('#animationList').show()
      $('#animationChapterList').hide()
      this.animationName = ''
    }
  }
}
</script>

<style>
#animationList li {
  background-color: #EEEEEE;
  padding: 10px;
  margin-top: 10px;
  position: relative;
}
#animationChapterList li {
  background-color: #EEEEEE;
  float: left;
  width: 152px;
  margin: 8px 13px 0 0;
  overflow: hidden;
}
#animationView ul {
  list-style-type: none;
  padding-left: 0;
}
#animationView video {
  width: 100%;
  margin-top: 20px;
}

.search-animation-list {
  width: 1000px;
  max-width: 100%;
}
.common-animation-item {
  float: left;
  margin-bottom: 30px;
  font-size: 12px;
  line-height: 18px;
  color: #999;
  width: 180px;
  margin-right: 20px;
  max-width: 40%;
}
.common-animation-item .cover {
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 5px;
}
.common-animation-item .cover > img {
  width: 100%;
  height: 100%;
  border: none;
}
.animation__title {
  max-width: 100%;
  font-size: 8px;
  line-height: 26px;
  font-weight: 600;
  color: #28292d;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
