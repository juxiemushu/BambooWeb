<template v-loading="templateLoading"
  element-loading-text="拼命加载中"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.8)">
  <el-form ref="form" :model="generatorModel" label-width="10%">
    <div>
      <el-divider content-position="left">基础信息</el-divider>
    </div>
    <el-form-item label="所属项目模块">
      <el-select v-model="generatorModel.projectModule" placeholder="请选择" style="width:60%;">
        <el-option
          v-for="item in projectModuleData"
          :key="item.value"
          :label="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="项目基础路径">
      <el-input v-model="generatorModel.basePackage" style="width:60%;" placeholder="格式: com.wei.common"></el-input>
    </el-form-item>
    <el-form-item label="模块">
      <el-input v-model="generatorModel.module" style="width:60%;"></el-input>
    </el-form-item>
    <el-form-item label="表信息">
      <el-select v-model="generatorModel.tableNames" multiple placeholder="请选择表信息" style="width:60%;">
        <el-option
          v-for="item in tableData"
          :key="item.value"
          :label="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="作者">
      <el-input v-model="generatorModel.author" style="width:60%;"></el-input>
    </el-form-item>

    <el-button type="primary" round @click="fileGenerate">确定</el-button>
  </el-form>
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
        generatorModel: {},
        projectModuleData: [],
        tableData: []
      }
    },

    // 监听数据变化
    watch: {

    },

    // 界面函数
    methods: {

      fileGenerate: function() {
        console.log("model", this.generatorModel);
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
      },

      initEnumeratedValues: function() {
        this.projectModuleData = [{
          value: "common"
        }, {
          value: "order"
        }, {
          value: "product"
        }];

        this.tableData = [{
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