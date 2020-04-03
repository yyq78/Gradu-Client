<template>
  <div class="home">
    <el-container>
      <el-header>
        <h1>企业办公设备管理平台</h1>
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
    color: #333;
    text-align: center;
    line-height: 60px;
  }

</style>
