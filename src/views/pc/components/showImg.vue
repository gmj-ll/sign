<template>
  <el-dialog title="二维码" :visible="editModel" @close="handleClose" width="30%" :close-on-click-modal="false" append-to-body>
    <div>
      <qriously :value="url" :size="100" />
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    editModel: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      url: `${window.location.href}about`
    }
  },
  mounted() {
    console.log(this.url)
  },
  methods: {
    handleClose() {
      this.$emit('update:editModel', false)
    },
  },
}
</script>

<style>
</style>