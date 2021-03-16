<template>
  <div>
    <div style="border: 1px solid #DCDFE6">
      <vue-esign style="height: 220px;" ref="esign" />
    </div>
    <div>
      <el-button plain @click="reset">重置</el-button>
      <el-button type="primary" plain @click="sureSign">确认签名</el-button>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '../../api'
export default {
  methods: {
    data() {
      return {
        sign_base64: null,
      }
    },
    reset() {
      this.$refs.esign.reset()
    },
    sureSign() {
      this.$refs.esign
        .generate()
        .then((res) => {
          this.sign_base64 = res
          uploadImg({ imgData: res }).then((res) => {
            console.log(res)
            this.$socket.emit('sendImg', {
              url: res.data.url
            })
          })
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
  },
}
</script>

<style>
</style>