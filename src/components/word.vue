<template>
  <div>
    <div class="title">
      <div class="title-big">浙江财经大学职工年度考核表</div>
      <div class="title-small">（2019年度）</div>
    </div>
    <div class="formData">
      <div class="form">
        <el-form ref="form" label-position="left"  :model="formInline" :inline="true" label-width="100px">
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="部  门:" :label-width="60" class="bumen">
                <template slot="label"><div class="department">部门：</div></template>
                <el-input style="width: 200px;" v-model="formInline.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="姓名">
                <el-input v-model="formInline.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别">
                <el-select v-model="formInline.sex">
                  <el-option
                    label="男"
                    :value="1">
                  </el-option>
                  <el-option
                    label="女"
                    :value="0">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出生年月">
                <el-date-picker
                  v-model="formInline.borthday"
                  type="date"
                  >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24 ">
            <el-col :span="8">
              <el-form-item label="政治面貌">
                <el-select v-model="formInline.politicalStatus" >
                  <el-option
                    v-for="item in politicalStatusOptions"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="文化程度">
                <el-select v-model="formInline.education">
                  <el-option
                    v-for="item in educationOptions"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行政职务">
                <el-input v-model="formInline.administrativeDuties"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="专业技术职务">
                <el-input v-model="formInline.specializedTechnicalJob"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="工作岗位">
                <el-input v-model="formInline.jobPosition"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="center-row">
            <el-col :span="2"><div class="text-col">个人总结</div></el-col>
            <el-col :span="22">
              <el-form-item>
                <el-input type="textarea" :rows="10" v-model="formInline.personalSummary"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="center-row">
            <el-col :span="2"><div class="text-col">部门考核意见</div></el-col>
            <el-col :span="22">
              <el-form-item>
                <el-input type="textarea" :rows="10" v-model="formInline.departmentalAssessmentOpinions"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="form-foot">
              <el-date-picker
                style="width: 150px;margin-left:10px;"
                v-model="value1"
                type="date"
                >
              </el-date-picker>
          </div>
          <el-row :gutter="24" class="center-row">
            <el-col :span="2"><div class="text-col">审批意见</div></el-col>
            <el-col :span="22">
              <el-form-item>
                <el-input type="textarea" :rows="10" v-model="formInline.approvalComments"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="form-foot">
              <el-date-picker
                style="width: 150px;margin-left:10px;"
                v-model="value1"
                type="date"
                >
              </el-date-picker>
          </div>
          <el-row :gutter="24" class="center-row">
            <el-col :span="2"><div class="text-col">个人确认</div></el-col>
            <el-col :span="22">
              <el-form-item style="border: 1px solid #DCDFE6">
                <vue-esign ref="esign" :width="800" :height="300" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="form-foot">
            <el-button plain @click="reset">重置</el-button>
            <el-button type="primary" plain @click="sureSign">确认签名</el-button>
              <el-date-picker
                style="width: 150px;margin-left:10px;"
                v-model="value1"
                type="date"
                >
              </el-date-picker>
          </div>
        </el-form>
        <div class="foot">
          <el-divider content-position="right"><el-button type="primary">下载</el-button></el-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'word',
  props: {
    Content: {
      type: Array,
      default: () => []
    }
  },
  data () {
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
        personalConfirmation: ''
      },
      politicalStatusOptions: [
        {
          value: 1,
          label: '中共党员'
        },
        {
          value: 2,
          label: '中共预备党员'
        },
        {
          value: 3,
          label: '共青团员'
        },
        {
          value: 4,
          label: '群众'
        },
        {
          value: 5,
          label: '其他'
        }
      ],
      educationOptions: [
        {
          value: 1,
          label: '本科'
        },
        {
          value: 2,
          label: '硕士'
        },
        {
          value: 3,
          label: '博士'
        }
      ]
    }
  },
  methods: {
    reset () {
      this.$refs.esign.reset()
    },
    sureSign () {
      this.$refs.esign.generate().then(res => {
        console.log(res) // base64图片
      }).catch(err => {
        this.$message.error(err)
      })
    }
  }

}
</script>

<style lang="scss">



</style>