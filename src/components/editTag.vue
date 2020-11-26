<template>
  <el-dialog title="编辑标签" :visible="editModel" @close="handleClose" width="30%" :close-on-click-modal="false" append-to-body>
    <div class='content-Edit'>
      <el-form ref="form" :model="form" label-width="80px" label-position="left">
        <el-form-item label="标签名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="标签类型">
          <el-select v-model="form.type" placeholder="请选择活动区域">
            <el-option label="文本" value="text"></el-option>
            <el-option label="选择框" value="select"></el-option>
            <el-option label="时间" value="date"></el-option>
            <el-option label="长文本" value="textarea"></el-option>
            <el-option label="可绘制" value="sign"></el-option>
            <el-option label="表单标题" value="tableTitle"></el-option>
          </el-select>
          <el-button v-if="form.type==='select'" style="margin-top: 10px" size="small" type="primary" @click="editSelectModel = true">选择框内容编辑</el-button>
        </el-form-item>
        <el-form-item label="占宽">
          <el-slider v-model="form.contentWidth" :step="2" show-stops :min="2" :max="6" :disabled="canStep"></el-slider>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="addTags">确 定</el-button>
    </span>
    <select-content :editSelectModel.sync="editSelectModel" @selectSave="selectSave"></select-content>
  </el-dialog>
</template>

<script>
import selectContent from './selectContent'
import { addTags } from '../api'
export default {
  name: 'editTag',
  props: {
    editModel: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    selectContent
  },
  computed: {
    canStep () {
      if (this.form.type === 'textarea' || this.form.type === 'sign') {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    'form.type' (newValue) {
      console.log(newValue)
      if (this.form.type === 'textarea' || this.form.type === 'sign') {
        this.form.contentWidth = 12
      }
      if (this.form.type === 'text' || this.form.type === 'select' || this.form.type === 'date') {
        this.form.contentWidth = 2
      }
    }
  },
  data() {
    return {
      editSelectModel: false,
      form: {
        contentWidth: 0,
        name: '',
        type: ''
      },
    }
  },
  methods: {
    handleClose() {
      this.form = {
        contentWidth: 0,
        name: '',
        type: ''
      },
      this.$emit('update:editModel', false)
    },
    selectSave (arr) {
      this.editSelectModel = false
      this.form.options = arr
    },
    addTags () {
      console.log(this.form)
      addTags(this.form).then(res =>{
        if (res.code === 200) {
        this.$message({
          message: '添加成功',
          type: 'success'
        });
          this.$emit('update:editModel', false)
          this.$emit('regetTags')
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.content-Edit {
  /deep/.el-select{
  width: 100%
}
}
</style>