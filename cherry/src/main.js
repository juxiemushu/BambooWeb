import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入 Element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 引入全局的 css 样式
import './style/index.scss' 
import './registerServiceWorker'

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
