<template>
  <div class="home">
    <el-container>
      <el-header>
        <span>企业办公设备管理平台</span>
        <span><i class=""></i>欢迎你，{username}</span>
      </el-header>
      <el-main>
        <transition>
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>

  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>
<style scoped lang="less">
  .el-header{
    color: #fff;
    line-height: 60px;
    background-color:rgb(111,115,205);
    text-align: left;
  }
  .el-main {
    padding: 0;
    height: calc(100vh - 60px);
  }
</style>
