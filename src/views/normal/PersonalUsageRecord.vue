<template>
    <div class="main">
        <el-page-header @back="goBack" content="个人使用记录">
        </el-page-header>
        <el-tabs v-model="activeName" tab-position="top" class="tab" type="card">
            <el-tab-pane label="使用设备记录" name="useRequests"></el-tab-pane>
            <el-tab-pane label="归还设备记录" name="returnRequests"></el-tab-pane>
        </el-tabs>
        <div class="table1" v-if="isUseRequestsShow" >
            <div class="bar">
                <el-input
                    style="width:255px"
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索"
                    @input="handleChange">
                </el-input>
            </div>
            <el-table 
                :data="useRequests" 
                style="width: 100%" 
                key="useRequests"            
                stripe 
                v-loading="loading">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <div style="height: 200px;">
                            <el-form label-position="left" class="demo-table-expand" size="mini" label-width="90px">
                                <el-form-item label="设备名称">
                                    <span>{{ props.row.deviceCategoryName }}</span>
                                </el-form-item>
                                <el-form-item label="使用原因">
                                    <span>{{ props.row.useDescription }}</span>
                                </el-form-item>
                                <el-form-item label="预约时间">
                                    <span>{{ props.row.useDateTime }}</span>
                                </el-form-item>
                                <el-form-item label="状态">
                                    <span style="color:rgb(103,194,58)" v-if="props.row.status===1">已通过</span>
                                    <span style="color:rgb(245,108,108)" v-else-if="props.row.status===-1">被拒绝</span>
                                    <span style="color:rgb(64,158,255)" v-else>处理中</span>
                                </el-form-item>
                                <el-form-item label="失败原因" v-if="props.row.status===-1">
                                    <span style="color:rgb(245,108,108)">{{ props.row.reason }}</span>
                                </el-form-item>
                                <el-form-item label="操作" v-if="props.row.status===-1" >
                                    <el-button type="primary" v-if="props.row.status==-1" @click="requestAgain(props.row)">重新申请</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        
                    </template>
                </el-table-column>
                <el-table-column
                    prop="deviceCategoryName"
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
                <el-table-column
                prop="status"
                label="状态"
                >
                    <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.status===1">已通过</el-tag>
                    <el-tag type="danger" v-else-if="scope.row.status===-1">被拒绝</el-tag>
                    <el-tag v-else>处理中</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="right"
                background
                layout="total,sizes,prev, pager, next,jumper"
                @size-change="handleSizeChange"
                :page-sizes="[2,3,4,5]"
                :page-size="pageSize"
                :total="total"
                @current-change="current_change">
            </el-pagination>
        </div>
        <div class="table2" v-else>
            <div class="bar">
                <el-input
                    style="width:255px"
                    v-model="search2"
                    size="mini"
                    placeholder="输入关键字搜索"
                    @input="handleChange2">
                </el-input>
            </div>
            <el-table  :data="returnRequests" style="width: 100%" key="returnRequests" stripe>
                <el-table-column
                    prop="deviceCategoryName"
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
                <el-table-column
                    prop="status"
                    label="状态"
                >
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.status===1">已归还</el-tag>
                        <el-tag v-else>处理中</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="right"
                background
                layout="total,sizes,prev, pager, next,jumper"
                @size-change="handleSizeChange2"
                :page-sizes="[2,3,4,5]"
                :page-size="pageSize2"
                :total="total"
                @current-change="current_change2">
            </el-pagination>
        </div>
    </div> 
</template>
<script>
    import debounce from '../../utils/debounce';
    import CryptoJS from "crypto-js";
    export default{
        data(){
            return {
                loading:true,
                useRequests:[],
                returnRequests:[],
                userId:"",
                activeName:'useRequests',
                search:'',
                pageSize:5,
                currentPage:1,
                total:0,
                search2:'',
                pageSize2:5,
                currentPage2:1,
                total2:0
            }
        },
        computed:{
            isUseRequestsShow(){
                return this.activeName==='useRequests'?true:false;
            }
        },
        created(){
            this.getCookie();
            this.getUseRequests();
            this.getReturnRequests();
        },
        methods:{
            handleSizeChange(val) {
                this.pageSize = val;
                this.getUseRequests();
            },
            handleSizeChange2(val) {
                this.pageSize2 = val;
                this.getReturnRequests();
            },
            handleChange(){
                this.currentPage= 1;
                debounce(this.getUseRequests());
            },
            handleChange2(){
                this.currentPage2= 1;
                debounce(this.getReturnRequests());
            },           
            current_change(currentPage){
                this.currentPage = currentPage;
                this.getUseRequests();
            },
            current_change2(currentPage){
                this.currentPage2 = currentPage;
                this.getReturnRequests();
            },
            requestAgain(data){
                this.$router.push({name:'useDevice',params:{...data}});
            },
            goBack(){
                this.$router.push({name:'normal'});
            },
            getUseRequests(){
                this.$axios.get(`/getStaffUseRequests?userId=${this.userId}&search=${this.search}&pageSize=${this.pageSize}&currentPage=${this.currentPage}`).then((res)=>{
                    this.useRequests = res.data;
                    this.loading = false;
                    this.total = res.total;
                })
            },
            getReturnRequests(){
                this.$axios.get(`/getStaffReturnRequests?userId=${this.userId}&search=${this.search2}&pageSize=${this.pageSize2}&currentPage=${this.currentPage2}`).then((res)=>{
                    this.loading = false;
                    this.returnRequests = res.data;
                    this.total2 = res.total;
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
<style lang="less" scoped>
.main{
    padding:12px 24px;
    width:100%;
    height:100%;
    box-sizing: border-box;
}
.tab{
    padding:24px 0;
}
.bar{
    text-align: right;
}
.right{
    text-align: right;
}
</style>