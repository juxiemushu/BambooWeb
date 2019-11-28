<template>
  <div class="menu-item-wrapper">
    <template v-for="item in displayMenus">
      <el-submenu v-if="item.children" :index="item.name" :key="item.name">
        <template slot="title">
          <i class="el-icon-s-opportunity" aria-hidden="true"></i>
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>
        <template v-for="child in item.children">
          <router-link :to="child.path" :key="child.name">
            <el-menu-item :index="item.path + child.path" >
              <i class="el-icon-s-marketing" aria-hidden="true"></i>
              <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
      <router-link v-else :to="item.path" :key="item.name">
        <el-menu-item :index="item.path" class="submenu-title-noDropdown">
          <i class="el-icon-s-home" aria-hidden="true"></i>
          <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'menu-item',
    props: {
      menus: {
        type: Array
      }
    },
    computed: {
      displayMenus: function() {
        return this.menus.filter(function(item) {
          return !item.noMenu;
        })
      }
    }
  }
</script>

