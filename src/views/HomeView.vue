<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"><img src="../assets/logo.jpg" alt=""></el-col>
          <el-col :span="16"><h2>后台管理系统</h2></el-col>
          <el-col :span="4"> <button class="changeAuthority" @click="delToken">退出登录</button> </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        
        router
      >
      <!--router  开启路由模式可以通过el-menu-item index进行跳转-->
        
        <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
          <el-icon><icon-menu /></el-icon>
          <span>{{item.meta.title}}</span>
        </el-menu-item>
       
      </el-menu>
</el-aside>
<el-main>
  <!-- 路由出口 -->
  <router-view></router-view>
</el-main>
</el-container>
</el-container>
</div>
</template>

<script lang="ts">
    import {
        defineComponent
    } from 'vue';
    import {
        useRouter
    } from 'vue-router';
    export default defineComponent({
        setup() {
            const router = useRouter()
                // 获取页面所有路由
                // console.log(router.getRoutes())
            const list = router.getRoutes().filter(v => v.meta.isShow)
            console.log(list)
            const delToken = () => {
                localStorage.removeItem('token')
                router.push('/login')
            }
            return {
                list,
                delToken
            }
        }
    })
</script>
<style lang='scss' scoped>
    .el-header {
        height: 80px;
        background-color: #666;
    }
    
    img {
        height: 80px;
    }
    
    h2,
    .quit-login {
        text-align: center;
        height: 80px;
        line-height: 80px;
        color: white;
    }
    
    .el-menu {
        height: calc(100vh - 80px);
    }
    
    .changeAuthority {
        margin-top: 30px;
        padding: 8px;
        color: white;
        background-color: rgb(29, 29, 33);
    }
</style>