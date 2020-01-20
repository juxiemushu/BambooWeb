<template v-loading="templateLoading"
  element-loading-text="拼命加载中"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.8)">
  <div style="">
    <span><el-divider content-position="left">基础信息</el-divider></span>

    <el-form ref="form" :model="generatorModel" :rules="rules" label-width="10%">
      <el-form-item label="所属项目模块" prop="projectModule">
        <el-select v-model="generatorModel.projectModule" placeholder="请选择" style="width:60%;">
          <el-option
            v-for="item in projectModuleData"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目基础路径" prop="basePackage">
        <el-input v-model="generatorModel.basePackage" style="width:60%;" placeholder="格式: com.wei.common"></el-input>
      </el-form-item>
      <el-form-item label="模块" prop="module">
        <el-input v-model="generatorModel.module" style="width:60%;"></el-input>
      </el-form-item>
      <el-form-item label="表信息" prop="tableName">
        <el-select v-model="generatorModel.tableName" @change="tableInfoChange" placeholder="请选择表信息" style="width:60%;">
          <el-option
            v-for="item in databaseTableData"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="generatorModel.author" style="width:60%;"></el-input>
      </el-form-item>
    </el-form>

    <div>
      <span><el-divider content-position="left">文件信息</el-divider></span>
    </div>

    <el-row style="margin-bottom:10px;">
      <el-col :span="6" style="float:right; padding-left:20px;">
        <el-button type="primary" round @click="generateFile('form')" icon="el-icon-s-order">确定</el-button>
      </el-col>
      <el-col :span="6" style="float:right;">
        <el-input v-model="filePrefix" style="width:100%;" @input="filePrefixChange"></el-input>
      </el-col>
    </el-row>

    <el-table :data="generatorFileList"
      :loading="generatorFileTableLoading"
      highlight-current-row
      stripe
      border
      max-height="300px">
      <el-table-column prop="fileType" label="文件类型"></el-table-column>
      <el-table-column prop="fileName" label="文件名"></el-table-column>
      <el-table-column prop="createFlag" label="是否创建">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.createFlag"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="coverFlag" label="是否覆盖">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.coverFlag"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
  </div>
  
  
</template>

<script type="text/ecmascript-6">
  
  import { FileGenerate } from "@/api/system/generator";

  export default {
    // 界面引入组件
    components: {},

    // 绑定数据模型
    data(){
      return {
        templateLoading: false,
        generatorFileTableLoading: false,
        generatorModel: {},
        generatorFileList: [],
        projectModuleData: [],
        databaseTableData: [],
        filePrefix: "",
        
        // 表单校验规则
        rules: {
          projectModule: [
            { required: true, message: '请选择文件所属项目模块', trigger: 'blur' }
          ],
          basePackage: [
            { required: true, message: '请填写文件基础路径', trigger: 'blur' },
            { min: 1, max: 255, message: '长度最大为 255 个字符', trigger: 'blur' }
          ],
          module: [
            { required: true, message: '请填写文件所属模块', trigger: 'blur' }
          ],
          tableName: [
            { required: true, message: '请选择数据库表', trigger: 'blur' }
          ]
        },
      }
    },

    // 监听数据变化
    watch: {

    },

    // 界面函数
    methods: {

      // 根据界面信息生成文件
      generateFile: function(form) {
        this.$refs[form].validate((valid) => {
          if (!valid) {
            return false;
          } else {
            this.generatorModel.fileModelList = this.generatorFileList;
            FileGenerate(this.generatorModel)
              .then(res => {
                console.log("res", res);
                if(res.success) {
                  this.$message({
                    message: "文件生成成功!",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: "文件创建失败: " + res.message,
                    type: "error"
                  })
                }
              })
              .catch(e => {
                this.$message({
                    message: "文件创建失败: " + e,
                    type: "error"
                  })
              })
          }
        });
      },

      // 文件名前缀变化
      filePrefixChange: function(val) {
        this.resetGenerateFileList(val);
      },

      // 选择表格后，生成对应的文件名数据，显示在表格中
      tableInfoChange: function(val) {
        let humpVal = this.toHump(val);
        this.filePrefix = humpVal;
        this.resetGenerateFileList(humpVal);
      },

      // 重置表格数据
      resetGenerateFileList: function(val) {
        this.generatorFileList = [];
        this.generatorFileList.push({
          fileType: "entity",
          fileName: val + ".java",
          createFlag: true,
          coverFlag: true
        });
        this.generatorFileList.push({
          fileType: "mapper",
          fileName: val + "Mapper.java",
          createFlag: true,
          coverFlag: true
        });
        this.generatorFileList.push({
          fileType: "mapperxml",
          fileName: val + "Mapper.xml",
          createFlag: true,
          coverFlag: true
        });
        this.generatorFileList.push({
          fileType: "service",
          fileName: val + "Service.java",
          createFlag: true,
          coverFlag: true
        });
        this.generatorFileList.push({
          fileType: "serviceimpl",
          fileName: val + "ServiceImpl.java",
          createFlag: true,
          coverFlag: true
        });
        this.generatorFileList.push({
          fileType: "controller",
          fileName: val + "Controller.java",
          createFlag: true,
          coverFlag: true
        });
      },

      // 下划线转驼峰，且字母大写
      toHump: function(val) {
        if(val == null || val == undefined || val == ""){
          return "";
        }

        val = val.charAt(0).toUpperCase() + val.slice(1); 
        return val.replace(/\_(\w)/g, function(all, letter){
            return letter.toUpperCase();
        });
      },

      initEnumeratedValues: function() {
        this.projectModuleData = [{
          value: "common"
        }, {
          value: "order"
        }, {
          value: "product"
        }];

        this.databaseTableData = [{
          value: "bamboo_user"
        }, {
          value: "bamboo_role"
        }];
      }
    },

    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },

    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
      this.initEnumeratedValues();
    }
  }
</script>