<template>
  <div style="padding: 10px">
    <div class="title">
      <div :class="item.type" v-for="item in Content.title" :key="item.id">{{item.name}}</div>
    </div>
    <div class="fromTitleArr">
      <div v-for="item in Content.formTitle" :key="item.id">
        <el-form ref="form111" :model="formInline">
          <el-form-item :label="item.name">
            <el-input :class="item.type" v-model="formTitle[item.key].value" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="form" v-if="JSON.stringify(formInline) !== '{}'">
      <el-form ref="form" label-position="left" :model="formInline" :inline="true" label-width="100">
        <div class="form-item">
          <el-form-item v-for="item in Content.form" :style="'width:'+ 120*item.contentWidth + 'px'" :key="item.id" :label="item.name" label-width="60">
            <el-input v-if="item.type === 'text'" v-model="formInline[item.key].value"></el-input>
            <el-input type="textarea" v-if="item.type === 'textarea'" :rows="10" style="width:100%" v-model="formInline[item.key].value"></el-input>
            <el-select v-if="item.type === 'select'" v-model="formInline[item.key].value">
              <el-option v-for="opt in JSON.parse(item.options)" :key="opt.value" :label="opt.value" :value="opt.value"></el-option>
            </el-select>
            <el-date-picker v-if="item.type === 'date'" value-format="yyyy-MM-dd" v-model="formInline[item.key].value" type="date"></el-date-picker>
            <div v-if="item.type === 'sign'">
              <div style="border: 1px solid #DCDFE6">
                <vue-esign ref="esign" v-if="!isSign" />
                <div v-if="isSign">
                  <img style="width: 720px;" :src="signUrl">
                </div>
              </div>
              <div>
                <el-button plain @click="reset">重置</el-button>
                <el-button type="primary" plain @click="sureSign">确认签名</el-button>
                <el-button type="primary" plain @click="openQRcode">扫码签名</el-button>
              </div>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div v-if="JSON.stringify(Content) !== '{}'">
      <el-button @click="save">保存</el-button>
    </div>
    <show-img v-if="editModel" :editModel.sync="editModel"></show-img>
  </div>
</template>

<script>
import showImg from './showImg'
import { save } from '../../../api'
import dayjs from 'dayjs'
export default {
  name: 'word',
  components: {
    showImg,
  },
  props: {
    Content: {
      type: Object,
      default: () => {},
    },
    tagsArr: {
      type: Array
    }
  },
  mounted() {
    this.sockets.subscribe('getImg', (data) => {
      console.log(data)
      if (data.url) {
        this.signUrl = `http://localhost:3000/${data.url}`
        this.isSign = true
        this.editModel = false
      }
    })
  },
  data() {
    return {
      formInline: {
        // name: '',
        // sex: null,
        // borthday: '',
        // politicalStatus: null,
        // administrativeDuties: '',
        // specializedTechnicalJob: '',
        // jobPosition: '',
        // personalSummary: '',
        // departmentalAssessmentOpinions: '',
        // approvalComments: '',
        // personalConfirmation: '',
        // sign_base64: '',
        // fileName: '',
      },
      formTitle: {},
      editModel: false,
      isSign: false,
      signUrl: ''
    }
  },
  watch: {
    // tagsArr: {
    //   handler (val) {
    //     let obj = {}
    //     val.forEach(item => {
    //       if (item.key) {
    //         obj[item.key] = {
    //           value: '',
    //           name: item.name
    //         }
    //       }
    //     })
    //     this.formInline = Object.assign({}, this.formInline, obj)
    //   },
    //   deep: true
    // },
    Content: {
      handler (val) {
        let obj = {}
        val.form.forEach(item => {
          if (item.key) {
            obj[item.key] = {
              value: '',
              name: item.name
            }
          }
        })
        let title = {}
        val.formTitle.forEach(item => {
          if (item.key) {
            title[item.key] = {
              value: '',
              name: item.name
            }
          }
        })
        this.formInline = Object.assign({}, this.formInline, obj)
        this.formTitle = Object.assign({}, this.formTitle, title)
      },
      deep: true
    }
  },
  methods: {
    reset() {
      this.$refs.esign[0].reset()
    },
    sureSign() {
      this.$refs.esign[0]
        .generate()
        .then((res) => {
          this.Content.form.forEach(item => {
            if (item.type === 'sign') {
              this.formInline[item.key].value = res
            }
          })
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
    save() {
      let postData = JSON.parse(JSON.stringify(this.formInline))
      let postformTitle = JSON.parse(JSON.stringify(this.formTitle))
      Object.keys(postData).forEach(key => {
        if (postData[key].value instanceof Date) {
          postData[key].value = dayjs(postData[key]).format('YYYY-MM-DD HH:mm:ss')
        }
      })
      save({data: postData, fileName: this.Content.fileName, formTitle: postformTitle}).then((res) => {
        console.log(res)
        if (res.code === 200) {
          window.open(`http://localhost:3000/${res.data.msg}`, '_self')
        }
        console.log(res.data.msg)
        
      })
    },
    openQRcode() {
      this.editModel = true
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  padding-top: 25px;
  .wordTitle {
    font-size: 24px;
    font-weight: bold;
  }
  .subtitle {
    margin-top: 5px;
  }
}
.fromTitleArr {
  margin-top: 20px;
  text-align: left;
  .formTitle {
    margin-left: 5px;
    width: 200px;
  }
}
.form {
  padding: 15px;
  /deep/ .el-form-item__content {
    width: 100%;
    // width: 150px;
  }
  /deep/ .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  /deep/ .el-form-item {
    width: 100%;
    .el-form-item__content {
      width: 100%;
    }
  }
  /deep/ .bumen .el-form-item__content {
    // width: 200px;
  }
  .text-col {
    width: 14px;
    margin: 0 auto;
    font-size: 14px;
    color: #606266;
  }
  .center-row {
    display: flex;
    align-items: center;
  }
  .form-foot {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .form-item {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>