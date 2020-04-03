<template>
    <div>
        <el-page-header @back="goBack" content="个人使用记录">
        </el-page-header>
        <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick">
            <el-tab-pane label="使用设备记录" name="getUseRequests">使用设备记录</el-tab-pane>
            <el-tab-pane label="归还设备记录" name="getReturnRequests">归还设备记录</el-tab-pane>
        </el-tabs>
    </div> 
</template>
<script>
    export default{
        data(){
            return {
                useRequests:[],
                returnRequests:[],
                activeName:'second'
            }
        },
        create(){
            
        },
        methods:{
            handleClick(){
               
            },
            goBack(){
                this.$router.back();
            },
            getUser(){
                
            },
            getUseRequests(){
                
            }
        }
    }
</script>
<style lang="less">
</style>