<template>
  <div class="login-page">
    <div class="login">
      <div class="login-content">
        <!-- <div class="logo"></div> -->
        <div class="form">
          <div class="title">企业办公设备管理平台</div>
          <el-form  ref="login" :model="loginUser" :rules="loginRules">
            <el-form-item prop="account" key="acount1">
              <el-input  type="text" autocomplete="on" placeholder="请输入账号" v-model="loginUser.account" prefix-icon="el-icon-user" ></el-input>
            </el-form-item>
            <el-form-item prop="password" key="pass1">
              <el-input  type="password" autocomplete="on" show-password placeholder="请输入密码" v-model="loginUser.password" prefix-icon="el-icon-key"></el-input>
            </el-form-item>
          </el-form>
          <div class="aline">
            <el-checkbox v-model="rememberPsw">记住密码</el-checkbox>
          </div>
          <el-button type="primary" class="login_btn" @click="submitForm('login')">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import CryptoJS from "crypto-js";

export default {
  data(){
    return {
      loginUser:{
        account:"",
        password:""
      },
      rememberPsw:false,
      loginRules:{
        account:[{required:true,message:"请输入账号",trigger:'blur'}],
        password:[{required:true,message:"请输入密码",trigger:'blur'}]
      }
    }
  },
  methods:{
    //设置cookie
    setCookie(portId, psw, exdays) {
      // Encrypt，加密账号密码
      var cipherPortId = CryptoJS.AES.encrypt(portId+'',"secretkey123").toString();
      var cipherPsw = CryptoJS.AES.encrypt(psw+'', "secretkey123").toString();
      // console.log(cipherPortId+'/'+cipherPsw)//打印一下看看有没有加密成功

      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie，为什么这里用了==，因为加密后的字符串也有个=号，影响下面getcookie的字符串切割，你也可以使用更炫酷的符号。
      window.document.cookie =
        "currentPortId" +
        "==" +
        cipherPortId +
        ";path=/;expires=" +
        exdate.toGMTString();
      window.document.cookie =
        "password" +
        "==" +
        cipherPsw +
        ";path=/;expires=" +
        exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式请根据自己的代码更改
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("=="); //根据==切割
          //判断查找相对应的值
          if (arr2[0] == "currentPortId") {
            // Decrypt，将解密后的内容赋值给账号
            var bytes = CryptoJS.AES.decrypt(arr2[1], "secretkey123");
            this.loginUser.account = bytes.toString(CryptoJS.enc.Utf8)-0;
          } else if (arr2[0] == "password") {
            // Decrypt，将解密后的内容赋值给密码
            var bytes = CryptoJS.AES.decrypt(arr2[1], "secretkey123");
            this.loginUser.password = bytes.toString(CryptoJS.enc.Utf8);
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); 
    },
    //获得用户名、工号、所在部门,保存用户信息到sessionStorage
    getUserBasic(){
      this.$axios.post('/getUsersBasic',{"id":this.loginUser.account}).then((res)=>{
        const {userName,userId,userDepartment} = res.data[0];
        sessionStorage.setItem('userName',userName);
        sessionStorage.setItem('userId',userId);
        sessionStorage.setItem('userDepartment',userDepartment);
      });
    },
    //登录
    submitForm(formName){
      this.$refs[formName].validate((valid)=>{
        if (valid) {
          this.$axios.post('/login',this.loginUser).then((res)=>{
            //登陆成功！！
            if(!res.error){
              //返回token
              localStorage.setItem("tsToken",res.token);
              if(this.rememberPsw === true){
                //判断用户是否勾选了记住密码选项rememberPsw，传入保存的账号currentPortId，密码password，天数30
                this.setCookie(this.loginUser.account, this.loginUser.password, 30);
              }else{
                this.clearCookie();
              }
              //这里是因为要在created中判断，所以使用了localstorage比较简单，当然你也可以直接根据cookie的长度or其他骚操作来判断有没有记住密码。
              localStorage.setItem("rememberPsw", this.rememberPsw);
              //保存用户信息
              this.getUserBasic();
              //根据权限不同跳转不同的用户页面
              if(res.permissionId===0){
                this.$router.push({
                  name:'normal'
                });
              }else{
                this.$router.push({
                  name:'devices'
                });
              }
            }else{
              this.$message.error(`${res.msg}`);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  //判断是否记住密码
  //**注意这里的true是字符串格式，因为Boolean存进localstorage中会变成String**
 created() {
    //判断是否记住密码
    if (localStorage.getItem("rememberPsw") == 'true') {
      this.getCookie();
      this.rememberPsw = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .login-page{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background-image:url("../assets/login-back.svg");
    background-size:cover;
    background-position: center;
    outline:1px solid red;
  }
  .login{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    display: flex;
    &-content{
      width:400px;
      margin:auto;
      background-color:#fff;
      .form{
        padding:20px 40px 40px 40px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      }
      .title{
        text-align:center;
        font-size:18px;
        line-height:1.7;
        padding:18px 0;
        font-weight:bold;
      }
      .aline{
        display: flex;
        justify-content: space-between;
        padding-bottom:12px;
      }
      .login_btn{
        width:100%;
        display:block;
      }
    }
  }

</style>
