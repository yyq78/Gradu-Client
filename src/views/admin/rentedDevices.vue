<template>
    <div class="main">
        <el-table :data="rentedDevice" stripe border class="table" v-loading="loading" height="300">
            <el-table-column prop="deviceCategoryName" label="名称"></el-table-column>
            <el-table-column
            prop="useDateTime"
            label="借出时间"
            >
            </el-table-column>
            <el-table-column
            prop="userName"
            label="使用者"
            >
            </el-table-column>
            <el-table-column
            prop="userDepartment"
            label="所在部门"
            >
            </el-table-column>
            <el-table-column
            prop="userId"
            label="工号">
            </el-table-column>
            <el-table-column
            prop="useDescription"
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
            loading:true,
        }
    },
    created(){
        this.getAllRentedDevice();
    },
    methods:{
        getAllRentedDevice(){
            this.$axios.get('/getAllRentedDevices').then((res)=>{
                this.rentedDevice = res.data;
                this.loading = false;
            });
        }
    }
}
</script>

<style scoped>

</style>