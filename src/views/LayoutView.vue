<template>
    <div>
        <el-container>
          <el-header class="headers">
          <el-row :gutter="20" class="header">
        <el-col :span="16">后台管理系统</el-col>
        <el-col :span="8" class="right"> <el-button type="primary" @click="tuichu" >退出
        </el-button> </el-col>    
         </el-row>
          </el-header>
        <!-- 侧边栏区域 -->
          <el-container>
            <el-aside width="200px">  <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="1"
            text-color="#fff"
            router>
            <!-- 第一个 -->
                <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
                  <el-icon><icon-menu /></el-icon>
                  <span>{{ item.meta.title }}</span>
                </el-menu-item>
              </el-menu>
        </el-aside>
          <!-- 主题区域 -->
            <el-main>
                <!-- //设置路由定向出口 -->
                <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
const router = useRouter()
const list = router.getRoutes().filter(v => v.meta.isShow)

const tuichu = () => {
    window.sessionStorage.clear()
    router.push('/login')
}
</script>

<style lang="scss" scoped>
.headers{
    background-color: #565353;
    height: 100px;
}
.header{
    font-size: 40px;
    color: aliceblue;
    margin-top: 20px;   
}
.right{
    padding-left:300px !important
}
.el-aside{
    .el-menu{
 height: 708px;
    }
   
}   
       
</style>