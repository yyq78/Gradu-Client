<template>
    <div>
          <el-row :gutter="12">
          <el-col :span="8">
            <router-link to="/useDevice" tag="div">
              <el-card shadow="always" class="card">
                <h2 class="title">申请设备</h2>
                <p>填写办公设备使用申请单</p>
                <img src="../assets/assets1.png"/>
              </el-card>
            </router-link>
          </el-col>
          <el-col :span="8">
            <router-link to="/returnDevice"  tag="div">
              <el-card shadow="always" class="card">
                <h2 class="title">归还设备</h2>
                <p>填写办公设备归还申请单</p>
                <img src="../assets/assets2.png"/>
              </el-card>
            </router-link>
          </el-col>
          <el-col :span="8">
            <router-link to="/personalUsageRecord"  tag="div">
              <el-card shadow="always" class="card">
                <h2 class="title">历史记录</h2>
                <p>查看办公设备使用记录</p>
                <img src="../assets/assets3.jpg"/>
              </el-card>
            </router-link>
          </el-col>
        </el-row>
        <el-row :gutter="12">
           <el-col :span="8"  class="card">
             <router-link to="/userProfile"  tag="div">
                <el-card shadow="always">
                  <h2 class="title">个人中心</h2>
                  <p>查看或修改个人信息</p>
                  <img src="../assets/assets4.jpg"/>
                </el-card>
              </router-link>
          </el-col>
        </el-row>
    </div> 
</template>
<script>
    export default{

    }
</script>
<style lang="less">
  .title{
    font-size: 14px;
  }
  .title+p{
    font-size:12px;
  }
  .card:hover{
    cursor: pointer;
  }
</style>