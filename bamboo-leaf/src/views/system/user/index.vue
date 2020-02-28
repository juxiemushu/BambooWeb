<template v-loading="templateLoading"
  element-loading-text="拼命加载中"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.8)">
  <div style="">
    <span><el-divider content-position="left">查询条件</el-divider></span>

    <el-form ref="queryForm" :model="listQuery" label-width="10%">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="listQuery.model.username" style="width:60%;"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="listQuery.model.phoneNumber" style="width:60%;"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="listQuery.model.sex" style="width:60%;">
          <el-option
            v-for="item in sexData"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
       <el-button type="primary" round @click="getUserList()" icon="el-icon-s-order">查询</el-button>
      </el-form-item>
    </el-form>

    <div>
      <span><el-divider content-position="left">用户信息</el-divider></span>
    </div>

    <el-table :data="userList"
      :loading="userTableLoading"
      highlight-current-row
      stripe
      border
      max-height="300px">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.sex"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="birthday" label="生日"></el-table-column>
      <el-table-column prop="mobileNumber" label="手机号码"></el-table-column>
      <el-table-column prop="phoneNumber" label="电话号码"></el-table-column>
      <el-table-column prop="email" label="邮箱地址"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getUserList" />
  </div>
  
</template>

<script type="text/ecmascript-6">
  
  import { listUsers } from "@/api/system/sysUser";
  import Pagination from '@/components/Pagination'

  export default {
    // 界面引入组件
    components: { Pagination },

    // 绑定数据模型
    data(){
      return {
        templateLoading: false,
        userTableLoading: false,
        userList: [],
        total: 0,
        listQuery: {
          page: 1,
          pageSize: 20,
          model: {
            username: null
          }
        },
        sexData: []
      }
    },

    // 监听数据变化
    watch: { },

    // 界面函数
    methods: {
      // 根据查询条件，查询用户信息
      getUserList: function() {
        this.userTableLoading = true;
        listUsers(this.listQuery)
          .then(res => {
            this.userTableLoading = false;
            this.userList = res.records;
            this.total = 10;
            // if(res.success) {
            //   this.userList = res.data;
            // }else {
            //   this.$message({
            //     message: "数据查询失败: " + res.message,
            //     type: "error"
            //   })
            // }
          })
          .catch(e => {
            this.userTableLoading = false;
            this.$message({
                message: "数据查询失败: " + e,
                type: "error"
              })
          })
      },

      initEnumeratedValues: function() {
        this.sexData = [{
          value: "M",
          label: "男"
        }, {
          value: "W",
          label: "女"
        }];
      }
    },

    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },

    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
      this.initEnumeratedValues();
    }
  }
</script>