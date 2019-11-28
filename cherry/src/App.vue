<template>
  <div id="app">
     <!--登入动画-->
    <transition name="rotate-fall">
      <!-- router-view 是路由组件，可以实现同一个界面切换显示不同的组件，和route的index.js配合使用 -->
      <router-view class="app-router-view"></router-view>
    </transition>
  </div>
</template>

<style>
  #app .app-router-view {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    transform-style: preserve-3d;
    visibility: visible;
  }
</style>

<script>
  // vue 的过渡动画需要引入 css
  import 'vue-transition.css';

  export default {
    name: 'App'
  }
</script>
