<template>
  <div class="home">
    <el-container>
      <el-header>
        <span>企业办公设备管理平台</span>
        <el-popover
          class="user"
          placement="top-start"
          trigger="hover"
          >
          <span><i class="item el-icon-user"></i> 欢迎你，{{userName}}</span>
            <div class="item logout" @click="logout"><i class="el-icon-upload2"></i> 退出登录</div>
          <span slot="reference" ><el-avatar class="avator"> {{userName[0]}} </el-avatar></span>
        </el-popover>
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
      userId:'',
      userName:'',
      userDepartment:'',
      active:false
    }
  },
  created(){
    this.getSession();
  },
  methods:{
    //读取SessionStorage
    getSession: function() {
      this.userId = sessionStorage.getItem('userId');
      this.userName = sessionStorage.getItem('userName');
      this.userDepartment = sessionStorage.getItem('userDepartment');
    },
    logout:function(){
      this.$router.push({name:'login'});
    }  
  }
}
</script>
<style scoped lang="less">
  .el-header{
    color: #fff;
    line-height: 60px;
    background-color:rgb(111,115,205);
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    padding: 0;
    height: calc(100vh - 60px);
  }
  .avator{
    vertical-align: middle;
  }
  .item{
    line-height:32px;
    cursor:pointer;
  }
  .logout:hover{
    color:#F56C6C;
    text-decoration: underline;
  }
</style>
