<template>
  <div class='comics'>
    <div id='comicList'>
      <h4>收藏的漫画</h4>
      <ul>
        <li v-for="star in stars" :key="star.starCode">
          <p class="fl">
            <a class="pic">
              <img :src=star.starImage :alt=star.starName @click="chooseComic(star.starCode, star.starSourceCode)">
            </a>
            <span>
              <a class="yellow">{{ star.latestChapterName }}</a>
            </span>
          </p>
          <dl>
            <dt>{{ star.starName }}</dt>
            <dd @click="continueRead(star.starCode, star.chapterId, star.starSourceCode)">
              <p><em>历史：</em><span class="blue">{{ star.chapterName }}</span></p>
            </dd>
            <dd><p><em>最新：</em><span class="red">{{ star.latestChapterName }}</span></p></dd>
            <dd><p><em>来源：</em><span class="red">{{ star.starSource }}</span></p></dd>
          </dl>
        </li>
      </ul>
      <hr/>
      <h4>漫画搜索（点击封面即可收藏/取消收藏）</h4>
      <label><input id="comicSearch" type="text" class="search-query" style="width: 90%; margin-bottom: 15px;" @keyup.enter="searchComic" placeholder="输入漫画名"></label>
      <div class="search-comic-list">
        <div v-for="sc in searchComics" :key="sc.comicId" class="common-comic-item">
          <a class="cover" @click="starComic(sc.comicId, sc.name, sc.starSource, sc.starSourceCode, sc.src)">
            <img :src=sc.src alt="封面加载失败">
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
      <div id="mask" style="display: none">
        <div>
          <div class="top_comic_mask comic_mask_top" @click="reloadChapterImages()" @mousewheel.prevent @touchmove.prevent>
            <p class="comic_btn">重新获取</p>
          </div>
        </div>
        <div>
          <div class="left_comic_mask comic_mask_bottom" @click="beforeChapter()" @mousewheel.prevent @touchmove.prevent>
            <p class="comic_btn">上<br>一<br>话<br><br>快<br>捷<br>键<br>←</p>
          </div>
          <div class="middle_comic_mask comic_mask_bottom" @click="hideMask()" @mousewheel.prevent @touchmove.prevent>
            <p class="comic_btn">继<br>续<br>观<br>看</p>
          </div>
          <div class="right_comic_mask comic_mask_bottom" @click="afterChapter()" @mousewheel.prevent @touchmove.prevent>
            <p class="comic_btn">下<br>一<br>话<br><br>快<br>捷<br>键<br>→</p>
          </div>
        </div>
      </div>
      <div v-for="chapterImg in chapterImgs" :key="chapterImg.id">
        <img :src="chapterImg.src" @click="showMask()" @load="showImg(chapterImg.id)" style="display: none;" :id="chapterImg.id" class="comic-img" alt="加载失败">
        <img src="/static/img/load-img.gif" @click="showMask()" :id="chapterImg.id+'load'" class="load-img" alt="加载中">
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
      if (res === null) {
        _this.kPopup('请求失败')
        return
      }
      if (res.code === 0) {
        _this._self.stars = res.data
      } else {
        _this.kPopup(res.msg)
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
      const _this = this
      const comicName = $('#comicSearch').val()
      _this.$api.star.searchComic(comicName).then(res => {
        if (res.code === 0) {
          _this.searchComics = res.data
        } else {
          alert(res.msg)
        }
      })
    },
    starComic (comicId, comicName, starSource, starSourceCode, starImage) {
      const _this = this
      _this.$api.star.starComic(comicId, comicName, starSource, starSourceCode, starImage).then(res => {
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
      _this.curChapter = chapterId
      _this.starSourceCode = starSourceCode
      _this.$api.star.qryChapterImages(comicId, chapterId, starSourceCode).then(res => {
        if (res.code === 0) {
          _this.chapterImgs = res.data.data
          $('#comicList').hide()
          $('#chapter').show()
        } else {
          _this.kPopup(res.msg)
        }
      })
    },
    chooseComic (comic, starSourceCode) {
      let _this = this
      _this.comic = comic
      _this.starSourceCode = starSourceCode
      _this.$api.star.qryChapter(comic, starSourceCode).then(res => {
        if (res == null) {
          alert('查询失败')
          return
        }
        _this.chapters = res.data
        $('#comicList').hide()
        $('#chapterList').show()
      })
    },
    openChapter (chapterId) {
      let _this = this
      _this.curChapter = chapterId
      _this.$api.star.qryChapterImages(_this.comic, chapterId, _this.starSourceCode).then(res => {
        if (res.code === 0) {
          _this.chapterImgs = res.data.data
          $('#chapterList').hide()
          $('#chapter').show()
          document.scrollingElement.scrollTop = 0
        } else {
          _this.kPopup(res.msg)
        }
      })
    },
    beforeChapter () {
      let _this = this
      var curChapterId = _this.curChapter
      _this.$api.star.qryChapterImagesBefore(_this.comic, curChapterId, _this.starSourceCode).then(res => {
        if (res.code === 0) {
          $('.comic-img').hide()
          $('.load-img').show()
          _this.chapterImgs = res.data.data
          _this.curChapter = res.data.chapterId
          document.scrollingElement.scrollTop = 0
        } else {
          _this.kPopup(res.msg)
        }
        _this.hideMask()
      })
    },
    afterChapter () {
      let _this = this
      var curChapterId = _this.curChapter
      _this.$api.star.qryChapterImagesAfter(_this.comic, curChapterId, _this.starSourceCode).then(res => {
        if (res.code === 0) {
          $('.comic-img').hide()
          $('.load-img').show()
          _this.chapterImgs = []
          _this.chapterImgs = res.data.data
          _this.curChapter = res.data.chapterId
          document.scrollingElement.scrollTop = 0
        } else {
          _this.kPopup(res.msg)
        }
        _this.hideMask()
      })
    },
    reloadChapterImages () {
      const _this = this
      _this.$api.star.reloadChapterImages(_this.comic, _this.curChapter, _this.starSourceCode).then(res => {
        if (res.code === 0) {
          $('.comic-img').hide()
          $('.load-img').show()
          _this.chapterImgs = []
          _this.chapterImgs = res.data.data
          _this.curChapter = res.data.chapterId
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
      if (nowTime - _this.lastClickTime < 400) {
        _this.lastClickTime = 0
        $('#mask').show()
      } else {
        _this.lastClickTime = nowTime
      }
    },
    hideMask () {
      $('#mask').hide()
    },
    showImg (id) {
      console.log(id)
      $('#' + id).show()
      $('#' + id + 'load').hide()
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
  height: 300px;
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
  left: 0;
  width: 30%;
  opacity: 0.6;
}
.right_comic_mask {
  right: 0;
  width: 30%;
  opacity: 0.6;
}
.middle_comic_mask {
  left: 30%;
  width: 40%;
  opacity: 0.7;
}
.top_comic_mask {
  left: 0;
  width: 100%;
  opacity: 0.65;
}
.comic_mask_bottom {
  position: fixed;
  height: 85%;
  bottom: 0;
  background-color:#000000;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-pack: center;
  -webkit-box-align: center;
}
.comic_mask_top {
  position: fixed;
  height: calc(15% - 40px);
  width: 100%;
  top: 40px;
  background-color:#000000;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-pack: center;
  -webkit-box-align: center;
}
.comic_btn {
  color: #FFFFFF;
}

#comicList ul {
  padding-left: 0;
}
#comicList li {
  font-size: 12px;
  height: 170px;
  padding: 10px 20px 10px 20px;
  position: relative;
  overflow: hidden;
  border: 1px solid #CEE7FF;
  margin: 6px;
  min-width: 300px;
}
#comicList li p {
  margin-block: 0;
}
.fl {
  position: relative;
  display: block;
  width: 120px;
  float: left;
}
.fi a {
  padding: 4px;
  border: 1px solid #CCC;
  display: block;
  width: 120px;
  height: 150px;
  background-color: #FFF;
}
a.pic img {
  width: 120px;
  height: 150px;
  border: none;
}
.fl span {
  position: absolute;
  width: 112px;
  height: 20px;
  display: block;
  top: 130px;
  text-align: right;
  line-height: 20px;
  color: #FFF;
  background: url(../../static/img/status_bg.png) top right no-repeat;
  padding-right: 8px;
  _background: transparent;
}
.fl span a {
  padding: 0;
  border: none;
  display: inline;
  background-color: transparent;
  color: #FFF;
  white-space: nowrap;
}
em {
  font-style: normal;
}
#comicList dl {
  float: left;
  max-width: 200px;
}
#comicList dt {
  height: 30px;
}
#comicList dd {
  margin: 0;
  padding: 0;
  height: 20px;
}
.red {
  color: #F00;
}
.blue {
  color: #00F;
}
</style>
