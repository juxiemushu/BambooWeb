<template>
  <el-menu class="navbar" mode="horizontal">
    <na-svg class="svg-container" :toggleClick="toggleSideBar" :isActive="barEffect.open"></na-svg>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-top:20px; padding-left:50px;">
      <el-breadcrumb-item><span style="color:white;">首页</span></el-breadcrumb-item>
      <el-breadcrumb-item><span style="color:white;">活动管理</span></el-breadcrumb-item>
      <el-breadcrumb-item><span style="color:white;">活动列表</span></el-breadcrumb-item>
      <el-breadcrumb-item><span style="color:white;">活动详情</span></el-breadcrumb-item>
    </el-breadcrumb>
  </el-menu>
</template>

<script>
    import NaSvg from './modules/naSvg'
    import { mapGetters } from 'vuex'
export default {
      components: { NaSvg },
      name: 'navbar',
      computed: {
        ...mapGetters(['barEffect'])
      },
      methods: {
        toggleSideBar() {
          this.$store.dispatch('ToggleBarEffect')
        }
      }
    }
</script>

<style ref="stylesheet/scss" lang="scss" scoped>
.navbar{
  height: 50px;
  line-height: 50px;
  background-color: #545c64;
  .svg-container {
    line-height: 50px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
}
</style>
