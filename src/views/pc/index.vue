<template>
  <div id="app">
    <div class="content">
      <div class="setting-icon">
        <el-button type="primary" icon="el-icon-setting" @click="isShow = true">上传设置</el-button>
      </div>
      <upload class="upload" @getContent="getContent"></upload>
      <word :tagsArr="tagsArr" ref="word" :Content="Content"></word>
      <div v-if="JSON.stringify(uploadData) !=='{}'">
        <div>
          <el-button type="primary" @click="download">下载</el-button>
        </div>
      </div>
      <upload-setting :tagsArr="tagsArr" @regetTags="getTags" :visible.sync="isShow"></upload-setting>
    </div>
  </div>
</template>

<script>
import word from './components/word'
import upload from './components/upload'
import Word from './components/word.vue'
import uploadSetting from './components/uploadSetting'
import { getTags } from '../../api'
export default {
  name: 'App',
  components: {
    word,
    upload,
    uploadSetting,
  },
  data() {
    return {
      isShow: false,
      tagsArr: [],
      Content: {},
      uploadData: {},
    }
  },
  created() {
    this.getTags()
  },
  mounted() {
    // this.$socket.emit('sentToServer', {
    //   username: 'username',
    //   password: 'password',
    // })

  },
  methods: {
    getTags() {
      getTags().then((res) => {
        if (res.code === 200) {
          this.tagsArr = res.data
        }
      })
    },
    getContent(data) {
      console.log(data)
      this.Content = data
    },
    getUploadData(data) {
      console.log(data)
      this.uploadData = data
    },
    download() {},
  },
}

Word
</script>

<style lang="scss" scoped>
// @import './scss/index.scss';

.upload {
  padding: 20px;
  display: flex;
  justify-content: center;
}
.setting-icon {
  float: right;
  padding: 10px;
}
.content {
  height: 100%;
  width: 900px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
