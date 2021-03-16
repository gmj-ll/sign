# hello-world

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Online Web
See [here](http://139.196.85.119:8080/).


### 代码详细


## 主页面

```
<template>
  <div id="app">
    <div class="content">
      <div class="setting-icon">
        <el-button type="primary" icon="el-icon-setting" @click="isShow = true">上传设置</el-button>
      </div>
      <upload class="upload" @getContent="getContent"></upload>
      <word ref="word" :Content="Content"></word>
      <div v-if="JSON.stringify(uploadData) !=='{}'">
        <div>
          <el-button type="primary" @click="download">下载</el-button>
        </div>
      </div>
      <upload-setting :tagsArr="tagsArr" @regetTags="getTags" :visible.sync="isShow"></upload-setting>
    </div>
  </div>
</template>

<script>
import word from './components/word'
import upload from './components/upload'
import Word from './components/word.vue'
import uploadSetting from './components/uploadSetting'
import { getTags } from '../../api'
export default {
  name: 'App',
  components: {
    word,
    upload,
    uploadSetting,
  },
  data() {
    return {
      isShow: false,
      tagsArr: [],
      Content: {},
      uploadData: {},
    }
  },
  created() {
    this.getTags()
  },
  mounted() {
    // this.$socket.emit('sentToServer', {
    //   username: 'username',
    //   password: 'password',
    // })

  },
  methods: {
    getTags() {
      getTags().then((res) => {
        if (res.code === 200) {
          this.tagsArr = res.data
        }
      })
    },
    getContent(data) {
      console.log(data)
      this.Content = data
    },
    getUploadData(data) {
      console.log(data)
      this.uploadData = data
    },
    download() {},
  },
}
</script>

<style lang="scss" scoped>
// @import './scss/index.scss';

.upload {
  padding: 20px;
  display: flex;
  justify-content: center;
}
.setting-icon {
  float: right;
  padding: 10px;
}
.content {
  height: 100%;
  width: 900px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>

```

## 上传设置页面

```
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
```

编辑/新增标签页面
```
<template>
  <el-dialog title="编辑标签" :visible="editModel" @close="handleClose" width="30%" :close-on-click-modal="false" append-to-body>
    <div class="content-Edit">
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
    <select-content v-if="editSelectModel" :editSelectModel.sync="editSelectModel" :selectData="form.options ? form.options: [{value: ''}]" @selectSave="selectSave"></select-content>
  </el-dialog>
</template>

<script>
import selectContent from './selectContent'
import { addTags, updateTags } from '../../../api'
export default {
  name: 'editTag',
  props: {
    editModel: {
      type: Boolean,
      default: false,
    },
    updateData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    selectContent,
  },
  computed: {
    canStep() {
      if (this.form.type === 'textarea' || this.form.type === 'sign') {
        return true
      } else {
        return false
      }
    },
  },
  watch: {
    'form.type'(newValue) {
      console.log(newValue)
      if (this.form.type === 'textarea' || this.form.type === 'sign') {
        this.form.contentWidth = 12
      }
      if (
        this.form.type === 'text' ||
        this.form.type === 'select' ||
        this.form.type === 'date'
      ) {
        this.form.contentWidth = 2
      }
    },
  },
  data() {
    return {
      editSelectModel: false,
      form: {
        contentWidth: this.updateData.contentWidth
          ? this.updateData.contentWidth
          : 2,
        options: this.updateData.options ? JSON.parse(this.updateData.options) : [],
        name: this.updateData.name ? this.updateData.name : '',
        type: this.updateData.type ? this.updateData.type : '',
        id: this.updateData.id ? this.updateData.id : null,
      },
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:editModel', false)
    },
    selectSave(arr) {
      this.editSelectModel = false
      this.form.options = arr
    },
    addTags() {
      this.form.options = JSON.stringify(this.form.options)
      console.log(this.form)
      if (this.form.id) {
        updateTags(this.form).then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '更新成功',
              type: 'success',
            })
            this.$emit('update:editModel', false)
            this.$emit('regetTags')
          }
        })
      } else {
        addTags(this.form).then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '添加成功',
              type: 'success',
            })
            this.$emit('update:editModel', false)
            this.$emit('regetTags')
          }
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.content-Edit {
  /deep/.el-select {
    width: 100%;
  }
}
</style>
```
如果设定识别标签为选项框，设定选项内容
```
<template>
  <el-dialog title="选择框内容编辑" :visible="editSelectModel" @close="handleClose" :close-on-click-modal="false" width="30%" append-to-body>
    <div>
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="80px" label-position="left" class="demo-dynamic">
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :label="'选项' + (index + 1)"
          :key="index"
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
    selectData: {
      type: Array,
      default: () => [{value: ''}]
    }
  },
  components: {},
  computed: {
    selectDataCopy () {
      console.log(this.selectData)
      if (this.selectData.length === 0) {
        let arr = [{value: ''}]
        return arr
      }
      return JSON.parse(JSON.stringify(this.selectData))
    } 
  },
  data() {
    return {
      dynamicValidateForm: {
        domains: [{value: ''}]
      },
    }
  },
  created () {
    this.dynamicValidateForm.domains = this.selectDataCopy.slice()
  },
  methods: {
    handleClose() {
      this.$emit('update:editSelectModel', false)
    },
    submitForm() {
      this.$refs.dynamicValidateForm.validate((valid) => {
        if (valid) {
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
        value: ''
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
```

## 和识别标签有关的后端


数据库操作
```
var tags = {
	insert:'insert into tags(name, type, contentWidth, options) values(?,?,?,?);',
	update:'update tags set name=?, type=?,contentWidth=?, options=?  where id=?;',
	delete: 'delete from tags where id=?;',
	queryById: 'select * from tags where id=?;',
	queryAll: 'select * from tags;',
	queryByName: 'select * from tags where name=?;',
	quaryName: 'select name from tags where key=?',
	addImg: 'insert into imgs(url, time) values(?,?);'
};
 
module.exports = tags;

```
后端接口
```
var express = require('express');
var router = express.Router();
var tagsDao = require('../dao/tagsDao')
/* GET users listing. */
router.post('/addTags', function(req, res, next) {
  tagsDao.add(req, res,next)
});

router.get('/getTags', function(req, res, next) {
  tagsDao.queryAll(req, res,next)
});

router.post('/deleteTags', function(req, res, next) {
  tagsDao.delete(req, res,next)
});
router.post('/updateTags', function(req, res, next) {
  tagsDao.update(req, res,next)
});

module.exports = router;

```

## 上传文件页面

```
<template>
  <div>
    <el-upload ref="upload" class="upload-demo" drag action :http-request="uploadword">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传.docx文件</div>
    </el-upload>
  </div>
</template>

<script>
import { upload } from '../../../api/index'
export default {
  name: 'upload',
  props: {},
  data() {
    return {}
  },
  methods: {
    uploadword (param) {
      console.log(param)
      let form = new FormData()
      form.append('file', param.file)
      form.append('name', '12138');
      upload(form).then(res => {
        if (res.code === 200) {
          this.$emit('getContent',res.data)
        }
      })
    }
  }
}
</script>
```

渲染文件页面
```
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
      <!-- <el-button @click="save">保存</el-button> -->
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
```
二维码弹框
```
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
```
后端数上传据层
```
var mysql = require('mysql');
var $conf = require('../conf/db');
//var $util = require('../util');
var $sql = require('./tagsSqlMapping');
var async = require("async");

// 使用连接池，提升性能
//var pool  = mysql.createPool($util.extend({}, $conf.mysql));
var pool = mysql.createPool($conf.mysql);

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json({
      code: 200,
      data: ret
    });
  }
};

module.exports = {
  add: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      // 获取前台页面传过来的参数
      var param = req.body;

      // 建立连接，向表中插入值
      // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
      console.log('contentWidth')
      console.log(param.contentWidth)
      connection.query($sql.insert, [param.name, param.type, param.contentWidth, param.options], function (err, result) {
        if (result) {
          result = {
            code: 200,
            msg: '增加成功'
          };
        }

        // 以json形式，把操作结果返回给前台页面
        jsonWrite(res, result);

        // 释放连接 
        connection.release();
      });
    });
  },
  delete: function (req, res, next) {
    // delete by Id

    pool.getConnection(function (err, connection) {
      var param = req.body;
      var id = +param.id;
      connection.query($sql.delete, id, function (err, result) {
        if (result.affectedRows > 0) {
          result = {
            code: 200,
            msg: '删除成功'
          };
        } else {
          result = void 0;
        }
        jsonWrite(res, result);
        connection.release();
      });
    });
  },
  update: function (req, res, next) {
    // update by id
    // 为了简单，要求同时传name和age两个参数
    var param = req.body;
    pool.getConnection(function (err, connection) {
      console.log(param)
      connection.query($sql.update, [param.name, param.type, param.contentWidth, param.options, +param.id], function (err, result) {
        // 使用页面进行跳转提示
        if (result.affectedRows > 0) {
          jsonWrite(res, result);
        } else {
          jsonWrite(res, result);
        }
        connection.release();
      });
    });

  },
  queryByIName: function (req, res, next) {
    var tableObj = {form: [], title: [], formTitle:[]}
    pool.getConnection(function (err, connection) {
      async.eachSeries(req.tableArr.title, function (item, callback) {
        connection.query($sql.queryByName, item, function(err, result) {
          console.log(item)
          console.log(result)
          if (result.length > 0) {
            if (result[0].type === 'formTitle') {
              tableObj.formTitle.push(result[0])
            } else {
              tableObj.title.push(result[0])
            }
          }
          callback();
        })
      },function(err) {
        if(err) {
          console.log(err);
        } else {
          async.eachSeries(req.tableArr.cell, function (item, callback) {
            connection.query($sql.queryByName, item, function(err, result) {
              if (result.length > 0) {
                tableObj.form.push(result[0])
              }
              callback();
            })
          },
          function (err) {
            if (err) {
              console.log(err)
            } else {
              console.log("SQL全部执行成功")
              req.tableObj = tableObj
              connection.release();
              next()
            }
          })
        }
      })
      // req.tableArr.title.forEach(item => {
      //   connection.query($sql.queryByName, item, function(err, result) {
      //     tableObj.item = result
      //   });
      // })
      // req.tableArr.cell.forEach(item => {
      //   connection.query($sql.queryByName, item, function(err, result) {
      //     tableObj.item = result
      //   });
      // })
    });
  },
  queryAll: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      connection.query($sql.queryAll, function (err, result) {
        jsonWrite(res, result);
        connection.release();
      });
    });
  },
  quaryName: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      connection.query($sql.quaryName, function (err, result) {
        jsonWrite(res, result);
        connection.release();
      });
    });
  },
  addImg: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      // 获取前台页面传过来的参数
      var url = res.url;
      var time = res.time;

      // 建立连接，向表中插入值
      // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
      connection.query($sql.addImg, [url, time], function (err, result) {
        if (result) {
          result = {
              url: url,
              time: time
          }
        }

        // 以json形式，把操作结果返回给前台页面
        jsonWrite(res, result);

        // 释放连接 
        connection.release();
      });
    });
  },
};

```

上传文件接口
```

var express = require('express');
const child_process = require('child_process');
var multer = require('multer')

var tagsRouter = require('./routes/tags');

var bodyParser = require('body-parser');

var tagsDao = require('./dao/tagsDao')

var tempWordMessage = {}
var fileName = ''

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
});

var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    return cb(null, './uploads');
  },
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    var fileName = new Date().getTime() + '-' + file.originalname
    req.fileName = fileName
    fileName = fileName
    cb(null, fileName);
  }
});


var upload = multer({
  storage: storage
});

connection.connect(function (err) {
  if (err) {
    console.log('connecting error');
    return;
  }
  console.log('connecting success');
})

var app = express();
app.use(bodyParser());
var allowCors = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
app.use(function (req, res, next) {
  req.connection = connection;
  next();
});
app.use(allowCors);//使用跨域中间件

// app.get('/', function (req, res) {
//   console.log("主页 GET 请求");
//   res.send('Hello GET');
// })

// app.post('/', function (req, res) {
//   console.log("主页 POST 请求");
//   res.send('Hello POST');
// })

// app.get('/get', function (req, res) {
//   console.log("主页 GET 请求");
//   res.send('Hello GET get');
// })
app.use(express.static('public'));
app.post('/uploadImg', function(req, res, next){
  var fs = require('fs');
  //接收前台POST过来的base64
  var imgData = req.body.imgData;
  var timeStemp = new Date().getTime()
  //过滤data:URL
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = Buffer.from(base64Data, 'base64'); // 这是另一种写法
  fs.writeFile(`./public/image-${timeStemp}.png`, dataBuffer, function(err) {
      if(err){
        res.send(err);
      }else{
        res.url = `image-${timeStemp}.png`
        res.time = timeStemp
        tagsDao.addImg(req, res, next)
      }
  })
})

var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json({
      code: 200,
      data: ret
    });
  }
};

app.use(upload.single('file'));
app.post('/upload', function (req, res, next) {
  var workerProcess = child_process.exec('python3 wordHandler.py ' + './uploads/' + req.fileName, function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: ' + error.code);
      console.log('Signal received: ' + error.signal);
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    var obj = JSON.parse(stdout);
    req.tableArr = obj.title.concat(obj.cell);
    req.tableArr = JSON.parse(stdout)
    next();
    // res.send(jsonWrite(res, JSON.parse(stdout)));
  });
  workerProcess.on('exit', function (code) {
    console.log('子进程已退出，退出码 ' + code);
  });
}, function (req, res, next) {
  tagsDao.queryByIName(req, res, next)
}, function (req, res) {
  req.tableObj.fileName = req.fileName
  res.send(jsonWrite(res, req.tableObj))
})

app.use('/tags', tagsRouter);

app.post('/save', function (req, res, next) {
  
  var workerProcess = child_process.exec('python3 wordHandlerWrite.py ' + './uploads/' + req.body.fileName + ` '${JSON.stringify(req.body)}'`, function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: ' + error.code);
      console.log('Signal received: ' + error.signal);
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    res.send(jsonWrite(res, '修改成功'))
    // var obj = JSON.parse(stdout);
    // req.tableArr = obj.title.concat(obj.cell);
    // res.send(jsonWrite(res, JSON.parse(stdout)));
  });
  workerProcess.on('exit', function (code) {
    console.log('子进程已退出，退出码 ' + code);
  })

  // tempWordMessage[fileName] = req.body
  // console.log(tempWordMessage)
})

app.get('/download', function (req, res, next) {
  res.download('demo.docx')
})

// app.get('/getTags', function (req, res) {
//   var connection = req.connection
//   let tagsList = []
//   connection.query('SELECT * FROM tags',function(err, rows, fields) {
//     if (err) throw err;
//     tagsList = rows
//     res.send(tagsList);
//   })
//   // connection.end();
//   res.send(tagsList);
// })




module.exports = app;
```

处理文件的py脚本

```
from docx import Document
from docx.shared import Inches
import re
import sys
import json


doc = Document(sys.argv[1])

# parag_num = 0
# for para in doc.paragraphs :
#     print(para.text)
#     parag_num  += 1  
# print ('This document has ', parag_num , ' paragraphs')

paragraphs = []

# 按段落读取全部数据
for paragraph in doc.paragraphs:
  text = paragraph.text.replace('\n', '').replace('\r', '').replace(' ', '').replace('：', '').replace(':', '')
  if text != '':
    paragraphs.append(text)

celltext = []

# 按表格读取全部数据
for table in doc.tables:
    for row in table.rows:
        for cell in row.cells:
          text = cell.text.replace('\n', '').replace('\r', '').replace(' ', '').replace('：', '').replace(':', '')
          if text != '':
            celltext.append(text)

content = {}

content['title'] = sorted(set(paragraphs), key=paragraphs.index)
content['cell'] = sorted(set(celltext), key=celltext.index)
print (json.dumps(content))
```
后端总的配置

```
#!/usr/bin/env node

/**
 * Module dependencies.
 */

 var app = require("../app");
 var debug = require("debug")("helloworld:server");
 var http = require("http");
 
 /**
  * Get port from environment and store in Express.
  */
 
 var port = normalizePort(process.env.PORT || "3000");
 app.set("port", port);
 
 /**
  * Create HTTP server.
  */
 
 var server = http.createServer(app);
 var io = require("socket.io")(server, {
   origins: ["http://139.196.85.119:8080"],
 });
 
 io.on("connection", (socket) => {
   // 监听客户端发送的信息
   socket.on("sendImg", (message) => {
     console.log(message)
     // 给客户端返回信息
     io.emit("getImg", message);
   });
 });
 
 /**
  * Listen on provided port, on all network interfaces.
  */
 
 server.listen(port);
 server.on("error", onError);
 server.on("listening", onListening);
 
 /**
  * Normalize a port into a number, string, or false.
  */
 
 function normalizePort(val) {
   var port = parseInt(val, 10);
 
   if (isNaN(port)) {
     // named pipe
     return val;
   }
 
   if (port >= 0) {
     // port number
     return port;
   }
 
   return false;
 }
 
 /**
  * Event listener for HTTP server "error" event.
  */
 
 function onError(error) {
   if (error.syscall !== "listen") {
     throw error;
   }
 
   var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
 
   // handle specific listen errors with friendly messages
   switch (error.code) {
     case "EACCES":
       console.error(bind + " requires elevated privileges");
       process.exit(1);
       break;
     case "EADDRINUSE":
       console.error(bind + " is already in use");
       process.exit(1);
       break;
     default:
       throw error;
   }
 }
 
 /**
  * Event listener for HTTP server "listening" event.
  */
 
 function onListening() {
   var addr = server.address();
   var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
   debug("Listening on " + bind);
 }
 
```

前端总的配置

```
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import vueEsign from 'vue-esign'

import 'element-ui/lib/theme-chalk/index.css';
import VueQriously from 'vue-qriously'
import router from './router'
import VueSocketio from 'vue-socket.io';
Vue.use(VueQriously)

Vue.use(ElementUI);
Vue.use(vueEsign)
Vue.use(new VueSocketio({
  // debug: true,
  connection: 'http://139.196.85.119:3000' //地址+端口，由后端提供
}));

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


```

前端路由配置

```
import Vue from 'vue'
import VueRouter from 'vue-router'
import pc from '../views/pc'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: pc
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/mobile')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/dist/',
  routes
})

export default router

```

前端用到的npm包名

```
{
  "name": "hello-world",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "axios": "^0.21.0",
    "core-js": "^3.6.5",
    "element-ui": "^2.14.0",
    "mammoth": "^1.4.14",
    "qrcode": "^1.4.4",
    "vue": "^2.6.11",
    "vue-esign": "^1.0.5",
    "vue-qriously": "^1.1.1",
    "vue-router": "^3.2.0",
    "vue-socket.io": "^3.0.10"
  },
  "devDependencies": {
    "@types/qrcode": "^1.4.0",
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-plugin-router": "^4.5.11",
    "@vue/cli-service": "~4.5.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^6.2.2",
    "node-sass": "^5.0.0",
    "sass-loader": "^10.0.5",
    "vue-template-compiler": "^2.6.11"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {}
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}

```

前端接口axios设置

```
import axios from 'axios'

const service = axios.create({
  baseURL: 'http://139.196.85.119:3000/',
  // withCredentials: false,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data

    // 与后端约定的错误码
    if (res.code !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)
export default service


```

前端api

```
import request from '../axios/request'

export function upload(data) {
  return request({
    url: '/upload',
    method: 'post',
    data,
    headers: { "Content-Type": "multipart/form-data" },
  })
}

export function getTags() {
  return request({
    url: '/tags/getTags',
    method: 'get',
  })
}

export function addTags(data) {
  return request({
    url: '/tags/addTags',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' },
  })
}

export function deleteTags(data) {
  return request({
    url: '/tags/deleteTags',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' },
  })
}

export function updateTags(data) {
  return request({
    url: '/tags/updateTags',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' },
  })
}

export function save(data) {
  return request({
    url: '/save',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' },
  })
}

export function uploadImg(data) {
  return request({
    url: '/uploadImg',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' },
  })
}
```

手机扫码页面

```
<template>
  <div>
    <div style="border: 1px solid #DCDFE6">
      <vue-esign style="height: 220px;" ref="esign" />
    </div>
    <div>
      <el-button plain @click="reset">重置</el-button>
      <el-button type="primary" plain @click="sureSign">确认签名</el-button>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '../../api'
export default {
  methods: {
    data() {
      return {
        sign_base64: null,
      }
    },
    reset() {
      this.$refs.esign.reset()
    },
    sureSign() {
      this.$refs.esign
        .generate()
        .then((res) => {
          this.sign_base64 = res
          uploadImg({ imgData: res }).then((res) => {
            console.log(res)
            this.$socket.emit('sendImg', {
              url: res.data.url
            })
          })
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
  },
}
</script>

<style>
</style>
```

数据库表结构
```
CREATE TABLE `tags` (
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `contentWidth` int(255) DEFAULT '2',
  `options` varchar(255) DEFAULT NULL,
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8
```

```
CREATE TABLE `FormTitle` (
  `姓名` varchar(255) DEFAULT NULL,
  `性别` varchar(255) DEFAULT NULL,
  `出生年月` varchar(255) DEFAULT NULL,
  `政治面貌` varchar(255) DEFAULT NULL,
  `文化程度` varchar(255) DEFAULT NULL,
  `行政职务` varchar(255) DEFAULT NULL,
  `专业技术职务` varchar(255) DEFAULT NULL,
  `工作岗位` varchar(255) DEFAULT NULL,
  `个人总结` varchar(255) DEFAULT NULL,
  `部门考核意见` varchar(255) DEFAULT NULL,
  `审批意见` varchar(255) DEFAULT NULL,
  `个人确认` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1
```

```
CREATE TABLE `imgs` (
  `url` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1
```

