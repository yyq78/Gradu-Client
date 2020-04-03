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
    </div> 
</template>
<script>
    export default{

    }
</script>
<style lang="less">

  .title{
    font-size: 16px;
    text-align:center;
  }
  .title+p{
    font-size:14px;
    text-align:center;
    margin-top:24px;
    margin-bottom:100px;
  }
  .title+p img{
    width:100%;
  
  }
  .card:hover{
    cursor: pointer;
  }
</style>