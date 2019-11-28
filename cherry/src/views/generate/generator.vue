<template v-loading="templateLoading"
  element-loading-text="拼命加载中"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.8)">
  <el-form :model="generatorModel">
    <el-form-item label="表格名称" label-width="10%">
      <el-input v-model="generatorModel.tableName"></el-input>
    </el-form-item>
    <el-form-item label="项目路径" label-width="10%">
      <el-input v-model="generatorModel.projectPath"></el-input>
    </el-form-item>
    <el-form-item label="基础路径" label-width="10%">
      <el-input v-model="generatorModel.projectPath"></el-input>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        templateLoading: false,
        generatorModel: {}
      }
    }
  }
</script>