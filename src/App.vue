<template>
  <div id="app">
    <div class="content">
      <div class="setting-icon"><el-button type="primary" icon="el-icon-setting" @click="isShow = true">上传设置</el-button></div>
      <upload class="upload"></upload>
      <word></word>
      <upload-setting :visible.sync="isShow"></upload-setting>
    </div>
  </div>
</template>

<script>
import word from './components/word'
import upload from './components/upload'
import Word from './components/word.vue'
import uploadSetting from './components/uploadSetting'
export default {
  name: 'App',
  components: {
    word,
    upload,
    uploadSetting
  },
  data () {
    return {
      isShow: false
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
