<template>
  <div id="app">
    <div class="content">
      <div class="setting-icon"><el-button type="primary" icon="el-icon-setting" @click="isShow = true">上传设置</el-button></div>
      <upload class="upload" @getContent="getContent"></upload>
      <word :Content="Content"></word>
      <upload-setting :tagsArr="tagsArr" @regetTags="getTags" :visible.sync="isShow"></upload-setting>
    </div>
  </div>
</template>

<script>
import word from './components/word'
import upload from './components/upload'
import Word from './components/word.vue'
import uploadSetting from './components/uploadSetting'
import { getTags } from './api'
export default {
  name: 'App',
  components: {
    word,
    upload,
    uploadSetting
  },
  data () {
    return {
      isShow: false,
      tagsArr: [],
      Content: []
    }
  },
  created() {
    this.getTags()
  },
  methods: {
    getTags() {
      getTags().then(res => {
        if (res.code === 200) {
          this.tagsArr = res.data
        }
      })
    },
    getContent (data) {
      console.log(data)
      this.Content = data
    }
  }
}

    Word</script>

<style lang="scss">
@import './scss/index.scss';

.upload{
  padding: 20px;
  display: flex;
  justify-content: center;
}
.setting-icon {
  float: right;
  padding: 10px;
}
</style>
