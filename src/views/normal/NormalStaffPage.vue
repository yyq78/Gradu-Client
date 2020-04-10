<template>
    <div class="main">
          <el-row :gutter="12">
          <el-col :span="8">
            <router-link :to="{name:'useDevice'}" tag="div">
              <el-card shadow="always" class="card">
                <h2 class="title">申请设备</h2>
                <p>填写办公设备使用申请单</p>
                <div class="img">
                  <img src="../../assets/assets1.png"/>
                </div> 
              </el-card>
            </router-link>
          </el-col>
          <el-col :span="8">
            <router-link :to="{name:'returnDevice'}"  tag="div">
              <el-card shadow="always" class="card">
                <h2 class="title">归还设备</h2>
                <p>填写办公设备归还申请单</p>
                <div class="img">
                  <img src="../../assets/assets2.png"/>
                </div>
              </el-card>
            </router-link>
          </el-col>
          <el-col :span="8">
            <router-link :to="{name:'personalUsageRecord'}"  tag="div">
              <el-card shadow="always" class="card">
                <h2 class="title">历史记录</h2>
                <p>查看办公设备使用记录</p>
                <div class="img">
                  <img src="../../assets/assets3.jpg"/>
                </div>
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
  .main{
    padding:24px;
  }
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
  .img{
    width:100%;
    height:300px;
  }
  .img img{
    width:90%;
    height:80%;
  }
  .card:hover{
    cursor: pointer;
  }
</style>