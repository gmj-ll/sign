<template>
  <el-dialog title="编辑标签" :visible="editModel" @close="handleClose" width="30%" :close-on-click-modal="false" append-to-body>
    <div class='content-Edit'>
      <el-form ref="form" :model="form" label-width="80px" label-position="left">
        <el-form-item label="标签名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="标签类型">
          <el-select v-model="form.style" placeholder="请选择活动区域">
            <el-option label="文本" value="text"></el-option>
            <el-option label="选择框" value="select"></el-option>
            <el-option label="时间" value="date"></el-option>
            <el-option label="长文本" value="textarea"></el-option>
            <el-option label="可绘制" value="sign"></el-option>
          </el-select>
          <el-button v-if="form.style==='select'" style="margin-top: 10px" size="small" type="primary" @click="editSelectModel = true">选择框内容编辑</el-button>
        </el-form-item>
        <el-form-item label="占宽">
          <el-slider v-model="form.contextWidth" :step="2" show-stops :min="2" :max="12" :disabled="canStep"></el-slider>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </span>
    <select-content :editSelectModel.sync="editSelectModel" @selectSave="selectSave"></select-content>
  </el-dialog>
</template>

<script>
import selectContent from './selectContent'
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
      if (this.form.style === 'textarea' || this.form.style === 'sign') {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    'form.style' (newValue) {
      console.log(newValue)
      if (this.form.style === 'textarea' || this.form.style === 'sign') {
        this.form.contextWidth = 12
      }
      if (this.form.style === 'text' || this.form.style === 'select' || this.form.style === 'date') {
        this.form.contextWidth = 2
      }
    }
  },
  data() {
    return {
      editSelectModel: false,
      form: {
        contextWidth: 0,
        name: '',
        style: ''
      },
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:editModel', false)
    },
    selectSave (arr) {
      this.editSelectModel = false
      console.log(arr)
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