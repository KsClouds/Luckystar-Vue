<template>
  <div id="studyMaterialView">
    <div id="classificationList">
      <ul>
        <li v-for="classification in classifications" :key="classification.classId" @click="openClass(classification.classId)">
          {{ classification.className }}
        </li>
      </ul>
    </div>
    <div id="titleList" style="display: none;">
      <ul>
        <li v-for="title in titles" :key="title.titleId" @click="openMaterial(title.titleId)">
          {{ title.titleName }}
        </li>
      </ul>
    </div>
    <div id="content" style="display: none;">
      <div v-for="content in contents" :key="content.contentId">
        <pre>{{ content.contentContent }}</pre>
        <img :src="content.contentImgUrl">
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'StudyMaterial',
  data () {
    return {
      classifications: [],
      titles: [],
      contents: []
    }
  },
  created () {
    var _this = this
    _this.$api.studyMaterial.qryClassification().then(res => {
      if (res.code === 0) {
        _this.classifications = res.data
      } else {
        _this.kPopup(res.msg)
      }
    })
  },
  methods: {
    openClass (classId) {
      var _this = this
      var param = {
        classId: classId
      }
      _this.$api.studyMaterial.qryTitle(param).then(res => {
        if (res.code === 0) {
          _this.titles = res.data
          $('#classificationList').hide()
          $('#titleList').show()
        } else {
          _this.kPopup(res.msg)
        }
      })
    },
    openMaterial (titleId) {
      var _this = this
      var param = {
        titleId: titleId
      }
      _this.$api.studyMaterial.qryContent(param).then(res => {
        if (res.code === 0) {
          _this.contents = res.data
          $('#titleList').hide()
          $('#content').show()
        }
      })
    }
  }
}
</script>

<style>
#studyMaterialView li {
  background-color: #EEEEEE;
  padding: 10px;
  margin-top: 10px;
  position: relative;
}
#studyMaterialView ul {
  list-style-type: none;
  padding-left: 0;
}
#content div {
  overflow-x: auto;
}
#content pre {
  white-space: pre-wrap;
}
#content img {
  max-width: 150%;
}
</style>
