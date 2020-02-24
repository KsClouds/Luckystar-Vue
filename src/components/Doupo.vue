<template>
  <div class='comics'>
    <div id='comicList'>
      <h4>收藏的漫画</h4>
      <ul>
        <li v-for="star in stars" :key="star.starCode">
          <a>{{ star.starName }} <br> 历史：{{ star.chapterName }} <br> 最新：{{ star.latestChapterName }}</a>
          <button class="oper-btn continue-read" @click="continueRead(star.starCode, star.chapterId, star.starSourceCode)">继续观看</button>
          <button class="oper-btn qry-chapter" @click="chooseComic(star.starCode, star.starSourceCode)">查看目录</button>
          <button class="oper-btn cancel-star" @click="starComic(star.starCode, star.starName, star.starSource, star.starSourceCode)">取消收藏</button>
        </li>
      </ul>
      <hr/>
      <h4>漫画搜索（点击封面即可收藏/取消收藏）</h4>
      <input id="comicSearch" type="text" class="search-query" style="width: 90%; margin-bottom: 15px;" @keyup.enter="searchComic">
      <div class="search-comic-list">
        <div v-for="sc in searchComics" :key="sc.comicId" class="common-comic-item">
          <a class="cover" @click="starComic(sc.comicId, sc.name, sc.starSource, sc.starSourceCode)">
            <img :src=sc.src>
          </a>
          <p class="comic__title">{{sc.name}}</p>
          <p class="comic-update">更至：{{sc.latestChapter}}</p>
          <p class="comic-update">来源：{{sc.starSource}}</p>
        </div>
      </div>
    </div>
    <div id='chapterList' style="display: none;">
      <ul>
        <li v-for="chapter in chapters" :key="chapter.chapterId" @click="openChapter(chapter.chapterId)">
          {{ chapter.chapter_id }} {{ chapter.title }}
        </li>
      </ul>
    </div>
    <div id='chapter' style="display: none;">
      <div id="mask" style="display: none;">
        <div class="left_comic_mask comic_mask" @click="beforeChapter()">
          <p class="comic_btn">上<br>一<br>话<br><br>快<br>捷<br>键<br>←</p>
        </div>
        <div class="middle_comic_mask comic_mask" @click="hideMask()">
          <p class="comic_btn">继<br>续<br>观<br>看</p>
        </div>
        <div class="right_comic_mask comic_mask" @click="afterChapter()">
          <p class="comic_btn">下<br>一<br>话<br><br>快<br>捷<br>键<br>→</p>
        </div>
      </div>
      <div v-for="chapterImg in chapterImgs" :key="chapterImg.id">
        <img :src="chapterImg.src" @click="showMask()">
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
      searchComics: [],
      comic: null,
      stars: [],
      chapters: [],
      chapterImgs: [],
      curChapter: 0,
      lastClickTime: 0,
      starSourceCode: null
    }
  },
  created () {
    let _this = this
    _this.$api.star.qryStars().then(res => {
      if (res && res.code === 0) {
        _this._self.stars = res.data
      }
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
    searchComic () {
      var _this = this
      var comicName = $('#comicSearch').val()
      _this.$api.star.searchComic(comicName).then(res => {
        if (res.code === 0) {
          _this._self.searchComics = res.data
        } else {
          alert(res.msg)
        }
      })
    },
    starComic (comicId, comicName, starSource, starSourceCode) {
      var _this = this
      _this.$api.star.starComic(comicId, comicName, starSource, starSourceCode).then(res => {
        if (res.code === 0) {
          _this.kPopup(res.data)
          window.location.reload()
        } else {
          alert(res.msg)
        }
      })
    },
    continueRead (comicId, chapterId, starSourceCode) {
      let _this = this
      if (chapterId === null) {
        _this.kPopup('还没开始看呢')
        return
      }
      _this.comic = comicId
      _this._self.curChapter = chapterId
      _this.starSourceCode = starSourceCode
      _this.$api.star.qryChapterImages(comicId, chapterId, starSourceCode).then(res => {
        _this.chapterImgs = res.data.data
      })
      $('#comicList').hide()
      $('#chapter').show()
    },
    chooseComic (comic, starSourceCode) {
      let _this = this
      _this._self.comic = comic
      _this.starSourceCode = starSourceCode
      _this.$api.star.qryChapter(comic, starSourceCode).then(res => {
        if (res == null) {
          alert('查询失败')
          return
        }
        _this._self.chapters = res.data
        $('#comicList').hide()
        $('#chapterList').show()
      })
    },
    openChapter (chapterId) {
      let _this = this
      _this._self.curChapter = chapterId
      _this.$api.star.qryChapterImages(_this._self.comic, chapterId, _this.starSourceCode).then(res => {
        console.log(res)
        if (res.code === 0) {
          _this._self.chapterImgs = res.data.data
          $('#chapterList').hide()
          $('#chapter').show()
        } else {
          alert(res.msg)
        }
      })
    },
    beforeChapter () {
      let _this = this
      var curChapterId = _this._self.curChapter
      _this.$api.star.qryChapterImagesBefore(_this._self.comic, curChapterId, _this.starSourceCode).then(res => {
        if (res.code === 0) {
          _this._self.chapterImgs = res.data.data
          _this._self.curChapter = res.data.chapterId
          document.scrollingElement.scrollTop = 0
        } else {
          _this.kPopup(res.msg)
        }
        _this.hideMask()
      })
    },
    afterChapter () {
      let _this = this
      var curChapterId = _this._self.curChapter
      _this.$api.star.qryChapterImagesAfter(_this._self.comic, curChapterId, _this.starSourceCode).then(res => {
        if (res.code === 0) {
          _this._self.chapterImgs = res.data.data
          _this._self.curChapter = res.data.chapterId
          document.scrollingElement.scrollTop = 0
        } else {
          _this.kPopup(res.msg)
        }
        _this.hideMask()
      })
    },
    showMask () {
      var _this = this
      var nowTime = new Date().getTime()
      if (nowTime - _this._self.lastClickTime < 400) {
        _this._self.lastClickTime = 0
        $('#mask').show()
      } else {
        _this._self.lastClickTime = nowTime
      }
    },
    hideMask () {
      $('#mask').hide()
    }
  }
}
</script>

<style>
.comics li {
  background-color: #EEEEEE;
  padding: 10px;
  margin-top: 10px;
  position: relative;
}
.comics ul {
  list-style-type: none;
  padding-left: 0;
}
#comicList a {
  cursor: pointer;
}
#comicList a:hover {
  font-size: 21px;
}
.title {
  font-size: 25px;
}
hr {
  height:2px;
  border:none;
  border-top:2px dotted #185598;
}
.search-comic-list {
  width: 1000px;
  max-width: 100%;
}
.common-comic-item {
  float: left;
  margin-bottom: 30px;
  font-size: 12px;
  line-height: 18px;
  color: #999;
  width: 180px;
  margin-right: 20px;
  max-width: 40%;
}
.common-comic-item .cover {
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 5px;
}
.cover > img {
  width: 100%;
  height: 100%;
  border: none;
}
.comic__title {
  max-width: 100%;
  font-size: 15px;
  line-height: 26px;
  font-weight: 600;
  color: #28292d;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.common-comic-item .comic-update {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search-query {
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  padding: 0 15px 0 30px;
  border: 1px solid #e3e3e3;
  color: #273849;
  outline: none;
  border-radius: 15px;
  margin-right: 10px;
  transition: border-color 0.2s ease;
  background: #fff url(../assets/search.png) 8px 5px no-repeat;
  background-size: 20px;
  vertical-align: middle !important;
}
#chapter img {
  max-width: 100%;
}
.left_comic_mask {
  left: 0px;
  width: 30%;
  opacity: 0.6;
}
.right_comic_mask {
  right: 0px;
  width: 30%;
  opacity: 0.6;
}
.middle_comic_mask {
  left: 30%;
  width: 40%;
  opacity: 0.7;
}
.comic_mask {
  position: fixed;
  height: 100%;
  background-color:#000000;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-pack: center;
  -moz-box-align: center;
  display: -o-box;
  -o-box-orient: horizontal;
  -o-box-pack: center;
  -o-box-align: center;
  display: -ms-box;
  -ms-box-orient: horizontal;
  -ms-box-pack: center;
  -ms-box-align: center;
  display: box;
  box-orient: horizontal;
  box-pack: center;
  box-align: center;
}
.comic_btn {
  color: #FFFFFF;
}
.oper-btn {
  position: absolute;
  right: 10px;
}
.continue-read {
  top: 1px;
}
.qry-chapter {
  top: 24px;
}
.cancel-star {
  top: 47px;
}
</style>
