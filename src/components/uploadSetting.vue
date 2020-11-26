<template>
  <el-dialog title="上传设置" :visible="visible" @close="handleClose" :close-on-click-modal="false" width="40%">
    <div class="content-tag">
      <div class="tags">
        <div v-for="item in tagsList" :key="item.id"><el-tag closable @close="deleteTag(item)">{{item.name}}</el-tag></div>
        <div>
          <el-button class="button-new-tag" size="small" @click="editModel = true">+ 新增</el-button>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">关 闭</el-button>
    </span>
    <edit-tag :editModel.sync="editModel" @regetTags="regetTags"></edit-tag>
  </el-dialog>
</template>

<script>
import editTag from './editTag'
import { deleteTags } from '../api'
export default {
  name: 'uploadSetting',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    tagsArr: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    tagsList () {
      return JSON.parse(JSON.stringify(this.tagsArr))
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
    deleteTag (tag) {
      deleteTags({ id: tag.id}).then(res=> {
        if (res.code === 200) {
          this.$emit('regetTags')
        }
      })
    },
    regetTags () {
      this.$emit('regetTags')
    }
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