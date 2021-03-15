<template>
  <el-dialog title="上传设置" :visible="visible" @close="handleClose" :close-on-click-modal="false" width="40%">
    <div class="content-tag">
      <div class="tags">
        <div v-for="item in tagsList" style="cursor: pointer;" :key="item.id" @click.stop="updateTags(item)">
          <el-popover placement="top" width="160" v-model="deleteModel[item.id]">
            <p>确认删除该标签?</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="deleteModel[item.id] = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteTag(item)">确定</el-button>
            </div>
            <el-tag closable slot="reference" @close="showDelete(item)">{{item.name}}</el-tag>
          </el-popover>
        </div>
        <div>
          <el-button class="button-new-tag" size="small" @click="editModel = true, updateData={}">+ 新增</el-button>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">关 闭</el-button>
    </span>
    <edit-tag v-if="editModel" :editModel.sync="editModel" :updateData="updateData" @regetTags="regetTags"></edit-tag>
  </el-dialog>
</template>

<script>
import editTag from './editTag'
import { deleteTags } from '../../../api'
export default {
  name: 'uploadSetting',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    tagsArr: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    tagsList() {
      return JSON.parse(JSON.stringify(this.tagsArr))
    }
  },
  components: {
    editTag,
  },
  created() {
    this.tagsList.forEach((item) => {
      this.deleteModel[item.id] = false
    })
  },
  data() {
    return {
      editModel: false,
      updateData: {},
      deleteModel: {},
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    deleteTag(tag) {
      deleteTags({ id: tag.id }).then((res) => {
        if (res.code === 200) {
          this.$emit('regetTags')
        }
      })
    },
    regetTags() {
      this.$emit('regetTags')
    },
    showDelete (item) {
      this.$set(this.deleteModel, item.id, true)
    },
    updateTags(tags) {
      this.editModel = true
      this.updateData = tags
    },
  },
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