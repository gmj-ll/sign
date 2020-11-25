<template>
  <el-dialog title="选择框内容编辑" :visible="editSelectModel" @close="handleClose" :close-on-click-modal="false" width="30%" append-to-body>
    <div>
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="80px" label-position="left" class="demo-dynamic">
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :label="'选项' + (index + 1)"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
          :rules="{
      required: true, message: '请输入', trigger: 'blur'
    }"
        >
          <el-input v-model="domain.value"></el-input>
        </el-form-item>
      </el-form>
      <div class="icons">
        <el-button type="primary" @click="addDomain" icon="el-icon-plus" size="small"></el-button>
        <el-button v-if="dynamicValidateForm.domains.length > 1" @click="removeDomain" size="small" icon="el-icon-minus"></el-button>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'selectContent',
  props: {
    editSelectModel: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {
      dynamicValidateForm: {
        domains: [
          {
            value: '',
          },
        ],
      },
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:editSelectModel', false)
      this.dynamicValidateForm = {
        domains: [
          {
            value: '',
          },
        ],
      }
    },
    submitForm() {
      this.$refs.dynamicValidateForm.validate((valid) => {
        if (valid) {
          this.dynamicValidateForm = {
            domains: [
              {
                value: '',
              },
            ],
          }
          this.$emit('selectSave', this.dynamicValidateForm.domains)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    removeDomain() {
      this.dynamicValidateForm.domains.splice(
        this.dynamicValidateForm.domains.length - 1,
        1
      )
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now(),
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.icons {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
</style>