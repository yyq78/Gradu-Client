<template>
    <div class="devices-wrap">
        <el-table :data="devices" stripe border class="table" height="300" v-loading="loading">
            <el-table-column prop="deviceName" label="名称"></el-table-column>
            <el-table-column
            prop="count"
            label="数量"
            >
            </el-table-column>
            <el-table-column
            prop="devicePrice"
            label="价格"
            >
            </el-table-column>
            <el-table-column
            prop="time"
            label="入库时间">
            </el-table-column>
             
        </el-table>
    </div>
    
</template>
<script>
    export default{
        data(){
            return {
                devices:[],
                loading:true,
            }
        },
        created(){
            this.getAllDevices();
        },
        methods:{
            getAllDevices(){
                //获取全部设备信息
                this.$axios.get('/getAllDevices').then((res)=>{
                    this.devices = [...res.data, ...res.data];
                    this.loading = false;
                });
            }

        },


    }
</script>
<style scoped>

</style>