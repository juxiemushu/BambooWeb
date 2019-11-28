import Vue from "vue";
import VueRouter from "vue-router";

import Home from '../views/Home'
import Sale from '../views/sale/index'
import Stock from '../views/stock/index'
import Ktree from '../components/ktree/index'
import Generator from '../views/generate/generator'

Vue.use(VueRouter);

export const mapMenu = [
  {
    path: '/',
    name: 'home',
    component: Home,
    noMenu: true
  },
  {
    path: '/ktree',
    name: 'ktree',
    component: Ktree,
    noMenu: true
  },
  {
    path: '/lock',
    name: '锁屏页',
    component: Sale,
    noMenu: true
  },
  {
    path: '/dashboard',
    name: '首页',
    meta: { title: '首页', icon: '' },
    component: null
  },
  {
    path: '/system/setup',
    name: 'system',
    component: Home,
    meta: { title: '系统功能', icon: '' },
    children: [
      {
        path: '/system/setup/generator',
        name: 'generator',
        component: Generator,
        meta: { title: '代码生成', icon: '' }
      },
      {
        path: '/sale/indent',
        name: 'indent',
        component: Stock,
        meta: { title: '销售订货单', icon: '' }
      }
    ]
  },
  {
    path: '/stock',
    name: '库存管理',
    component: Home,
    meta: { title: '库存管理', icon: '' },
    children: [{
      path: '/stock/outStock',
      name: '出库管理',
      meta: { title: '出库管理', icon: '' },
      component: null
    },
    {
      path: '/stock/putStock',
      name: '入库管理',
      meta: { title: '入库管理', icon: '' },
      component: null
    },
    {
      path: '/stock/endMonthHandle',
      name: '月末处理',
      meta: { title: '月末处理', icon: '' },
      component: null
    }
    ]
  }
]

// const routes = [
//   {
//     path: "/",
//     name: "home",
//     component: Home
//   },
//   {
//     path: "/about",
//     name: "about",
//     component: () =>
//       import(/* webpackChunkName: "about" */ "../views/About.vue")
//   }
// ];

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes
// });

const router = new VueRouter({
  routes: mapMenu
})

export default router;
