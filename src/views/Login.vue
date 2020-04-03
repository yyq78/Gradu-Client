<template>
  <div class="login-page">
    <div class="login">
      <div class="login-content">
        <!-- <div class="logo"></div> -->
        <div class="form" v-if="!isToSign">
          <div class="title">企业办公设备管理平台</div>
          <el-form  ref="login" :model="loginUser" :rules="loginRules">
            <el-form-item prop="account" key="acount1">
              <el-input  type="text" autocomplete="on" placeholder="请输入账号" v-model="loginUser.account" prefix-icon="el-icon-user" ></el-input>
            </el-form-item>
            <el-form-item prop="password" key="pass1">
              <el-input  type="password" autocomplete="on" show-password placeholder="请输入密码" v-model="loginUser.password" prefix-icon="el-icon-key"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="login_btn" @click="submitForm('login')">登录</el-button>
          <div class="aline">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <el-link type="primary" @click="toSign">没有账号？去注册</el-link>
          </div>
        </div>
        <div class="form" v-else>
          <div class="title">企业办公设备管理平台</div>
          <el-form ref="sign" :model="signUser" :rules="signRules">
            <el-form-item prop="signAccount" key="acount2">
              <el-input type="text" placeholder="请输入账号" v-model="signUser.signAccount" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="signPass" key="pass2">
              <el-input type="password" show-password placeholder="请输入密码" v-model="signUser.signPass" prefix-icon="el-icon-key"></el-input>
            </el-form-item>
            <el-form-item prop="checkpass">
              <el-input type="password" show-password placeholder="请确认密码" v-model="signUser.checkpass" prefix-icon="el-icon-key"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="login_btn" @click="submitForm('sign')">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface loginUser{
  account:string,
  password:string
}
interface signUser{
  signAccount:string,
  signPass:string,
  checkpass:string,
}
interface loginRules{
  account:validate[],
  password:validate[],
}
interface signRules{
  signAccount:validate[],
  signPass:validate[],
  checkpass:validate[],
}
interface validate{
  required?:boolean,
  validator?:any,
  message:string,
  trigger:string,
  min?: number,
  max?: number,
}
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  loginUser:loginUser= {
    account:"",
    password:""
  }
  signUser:signUser= {
    signAccount:"",
    signPass:"",
    checkpass:"",
  }
  checked:boolean = false;
  isToSign:boolean = false;
  loginRules:loginRules = {
    account:[{required:true,message:"请输入账号",trigger:'blur'}],
    password:[{required:true,message:"请输入密码",trigger:'blur'}]
  };
  signRules:signRules = {
    signAccount:[{required:true,message:"请输入账号",trigger:'blur'}],
    signPass:[{required:true,message:"请输入密码",trigger:'blur'}],
    checkpass:[{required:true,message:"两次输入密码不一致",trigger:'change',validator:this.validatePass2}]
  }
  toSign():void{
    this.isToSign = true;
  }
  validatePass2 (rule:any, value:string, callback:any):void{
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== this.signUser.signPass) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  }
  submitForm(formName:any){
    (this.$refs[formName] as any).validate((valid:string) => {
      if (valid) {
        if(formName==='login'){
          (this as any).$axios.post('/login',this.loginUser).then((res: any)=>{
            if(!res.error){
              localStorage.setItem("tsToken",res.token);
              this.$router.push('/index');
            }else{
              this.$message.error(`${res.msg}`);
            }
          })
        }else{
          (this as any).$axios.post('/register',this.signUser).then((res:any)=>{
            this.$message.success("注册成功！");
            this.isToSign = false;
          })
        }
      } else {
        console.log('error submit!!');
        return false;
      }
    });
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
        padding-top:12px;
      }
      .login_btn{
        width:100%;
        display:block;
      }
    }
  }

</style>
