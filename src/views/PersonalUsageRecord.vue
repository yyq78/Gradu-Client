<template>
    <div>
        <el-page-header @back="goBack" content="个人使用记录">
        </el-page-header>
        <el-tabs v-model="activeName" tab-position="top">
            <el-tab-pane label="使用设备记录" name="useRequests">使用设备记录</el-tab-pane>
            <el-tab-pane label="归还设备记录" name="returnRequests">归还设备记录</el-tab-pane>
        </el-tabs>
        <el-table v-if="isUseRequestsShow" :data="useRequests" style="width: 100%" key="useRequests">
            <el-table-column
                prop="userId"
                label="工号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="userName"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="userDepartment"
                label="部门">
            </el-table-column>
            <el-table-column
                prop="deviceCategoryId"
                label="设备类型">
            </el-table-column>
            <el-table-column
                prop="useDescription"
                label="使用目的">
            </el-table-column>
            <el-table-column
                prop="useDateTime"
                label="预约时间">
            </el-table-column>
        </el-table>
        <el-table v-else :data="returnRequests" style="width: 100%" key="returnRequests">
            <el-table-column
                prop="userId"
                label="工号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="userName"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="userDepartment"
                label="部门">
            </el-table-column>
            <el-table-column
                prop="deviceCategoryId"
                label="设备类型">
            </el-table-column>
            <el-table-column
                prop="deviceDamage"
                label="是否损坏">
            </el-table-column>
            <el-table-column
                prop="deviceDamageDes"
                label="设备损耗情况">
            </el-table-column>
            <el-table-column
                prop="returnDateTime"
                label="预约归还时间">
            </el-table-column>
        </el-table>
    </div> 
</template>
<script>
    import CryptoJS from "crypto-js";
    export default{
        data(){
            return {
                useRequests:[],
                returnRequests:[],
                userId:"",
                activeName:'useRequests'
            }
        },
        computed:{
            isUseRequestsShow(){
                return this.activeName==='useRequests'?true:false;
            }
        },
        created(){
            this.getCookie();
            this.getUseRequests(this.userId);
            this.getReturnRequests(this.userId);
        },
        methods:{
            goBack(){
                this.$router.back();
            },
            getUseRequests(userId){
                this.$axios.get(`/getUseRequests?userId=${userId}`).then((res)=>{
                    this.useRequests = res.data;
                })
            },
            getReturnRequests(userId){
                this.$axios.get(`/getReturnRequests?userId=${userId}`).then((res)=>{
                    this.returnRequests = res.data;
                })
            },
            //读取cookie
            getCookie() {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split("; "); //这里显示的格式请根据自己的代码更改
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split("=="); //根据==切割
                        //判断查找相对应的值
                        if (arr2[0] == "currentPortId") {
                            // Decrypt，将解密后的内容赋值给账号
                            var bytes = CryptoJS.AES.decrypt(arr2[1], "secretkey123");
                            this.userId = bytes.toString(CryptoJS.enc.Utf8)-0;
                        }
                    }
                }
            },
        }
    }
</script>
<style lang="less">
</style>