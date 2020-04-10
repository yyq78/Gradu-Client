<template>
    <div class="main">
        <el-table :data="rentedDevice" stripe border class="table">
            <el-table-column prop="usedDeviceName" label="名称"></el-table-column>
            <el-table-column
            prop="rentTime"
            label="借出时间"
            >
            </el-table-column>
            <el-table-column
            prop="owner"
            label="使用者"
            >
            </el-table-column>
            <el-table-column
            prop="ownerDepartment"
            label="所在部门"
            >
            </el-table-column>
            <el-table-column
            prop="ownerId"
            label="工号">
            </el-table-column>
            <el-table-column
            prop="reason"
            label="原因">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            rentedDevice:[],
        }
    },
    created(){
        this.getAllRentedDevice();
    },
    methods:{
        getAllRentedDevice(){
            this.$axios.get('/getAllRentedDevices').then((res)=>{
                this.rentedDevice = res.data;
            });
        }
    }
}
</script>

<style scoped>
    .main{
        flex:1;
        padding:24px;
        box-sizing: border-box;
        overflow-y: overlay;
    }
</style>