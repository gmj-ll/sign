<template>
  <el-dialog title="上传设置" :visible="visible" @close="handleClose" :close-on-click-modal="false" width="40%">
    <div class="content-tag">
      <div class="tags">
        <div><el-tag closable @close="deleteTag(tag)">标签一</el-tag></div>
        <div><el-tag>标签一</el-tag></div>
        <div><el-tag>标签一</el-tag></div>
        <div><el-tag>标签一</el-tag></div>
        <div><el-tag>标签一</el-tag></div>
        <div><el-tag>标签一</el-tag></div>
        <div><el-tag>标签一</el-tag></div>
        <div><el-tag>标签一</el-tag></div>
        <div>
          <el-button class="button-new-tag" size="small" @click="editModel = true">+ 新增</el-button>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">关 闭</el-button>
    </span>
    <edit-tag :editModel.sync="editModel"></edit-tag>
  </el-dialog>
</template>

<script>
import editTag from './editTag'
export default {
  name: 'uploadSetting',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    editTag
  },
  data () {
    return {
      editModel: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible',false)
    },
    deleteTag () {}
  }
}
</script>

<style lang="scss" scoped>
.content-tag {
  width: 100%;
  .tags {
    display: flex;
    flex-wrap: wrap;
    div {
      padding: 10px;
    }
  }
}
</style>