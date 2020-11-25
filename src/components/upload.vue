<template>
  <div>
    <el-upload ref="upload" class="upload-demo" drag action :http-request="uploadword">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传.docx文件</div>
    </el-upload>
  </div>
</template>

<script>
import { upload } from '../api/index'
export default {
  name: 'upload',
  props: {},
  data() {
    return {}
  },
  methods: {
    uploadword (param) {
      console.log(param)
      let form = new FormData()
      form.append('file', param.file)
      form.append('name', '12138');
      upload(form).then(res => {
        console.log(res)
      })
    }
  }
}
</script>