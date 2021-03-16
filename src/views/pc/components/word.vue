<template>
  <div style="padding: 10px">
    <div class="title">
      <div :class="item.type" v-for="item in Content.title" :key="item.id">{{item.name}}</div>
    </div>
    <div class="fromTitleArr">
      <div v-for="item in Content.formTitle" :key="item.id">
        <span>{{item.name}}</span>
        <el-input :class="item.type" v-model="formInline[item.key]" />
      </div>
    </div>
    <div class="form">
      <el-form ref="form" label-position="left" :model="formInline" :inline="true" label-width="100">
        <div class="form-item">
          <el-form-item v-for="item in Content.form" :style="'width:'+ 120*item.contentWidth + 'px'" :key="item.id" :label="item.name" label-width="60">
            <el-input v-if="item.type === 'text'" v-model="formInline[item.key]"></el-input>
            <el-input type="textarea" v-if="item.type === 'textarea'" :rows="10" style="width:100%" v-model="formInline[item.key]"></el-input>
            <el-select v-if="item.type === 'select'" v-model="formInline[item.key]">
              <el-option v-for="opt in JSON.parse(item.options)" :key="opt.value" :label="opt.value" :value="opt.value"></el-option>
            </el-select>
            <el-date-picker v-if="item.type === 'date'" v-model="formInline[item.key]" type="date"></el-date-picker>
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
    <div>
      <el-button @click="save">保存</el-button>
    </div>
    <show-img v-if="editModel" :editModel.sync="editModel"></show-img>
  </div>
</template>

<script>
import showImg from './showImg'
import { save } from '../../../api'
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
  },
  mounted() {
    console.log(document.domain)
    this.sockets.subscribe('getImg', (data) => {
      console.log(data)
      if (data.url) {
        this.signUrl = `http://139.196.85.119:3000/${data.url}`
        this.isSign = true
        this.editModel = false
      }
    })
  },
  data() {
    return {
      formInline: {
        name: '',
        sex: null,
        borthday: '',
        politicalStatus: null,
        administrativeDuties: '',
        specializedTechnicalJob: '',
        jobPosition: '',
        personalSummary: '',
        departmentalAssessmentOpinions: '',
        approvalComments: '',
        personalConfirmation: '',
        sign_base64: '',
        fileName: '',
      },
      editModel: false,
      isSign: false,
      signUrl: ''
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
          this.formInline.sign_base64 = res
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
    save() {
      this.formInline.fileName = this.Content.fileName
      save(this.formInline).then(() => {
        console.log('aaaaa')
        window.open('http://localhost:3000/download', '_self')
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
  margin-top: 5px;
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
    /deep/ .el-form-item__content {
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