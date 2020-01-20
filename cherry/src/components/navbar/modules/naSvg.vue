<template>
  <div style="" @click="toggleClick" :class="{'is-active':isActive}">
    <el-row>
      <i style="background-color:#fff;" class="el-icon-s-operation"></i>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: 'na-svg',
      props: {
        isActive: {
          type: Boolean,
          default: false
        },
        toggleClick: {
          type: Function,
          default: null
        }
      }
    }
</script>

<style scoped>
  .hamburger {
    display: inline-block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    transform: rotate(90deg);
    transition: .38s;
    transform-origin: 50% 50%;
  }
  .hamburger.is-active {
    transform: rotate(0deg);
  }
</style>
