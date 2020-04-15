<template>
    <div class="returnApprove-wrap">
          <el-table :data="tableData" stripe border class="table" height="500" v-loading="loading">
            <el-table-column prop="deviceCategoryName" label="设备名称"></el-table-column>
            <el-table-column
            prop="userName"
            label="申请人"
            >
            </el-table-column>
            <el-table-column
            prop="userId"
            label="工号"
            >
            </el-table-column>
            <el-table-column
            prop="userDepartment"
            label="部门">
            </el-table-column>
            <el-table-column
            prop="deviceDamage"
            label="是否损坏"
            >
            </el-table-column>
            <el-table-column
            prop="deviceDamageDes"
            label="损坏情况"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
          tableData:[],
          loading:true,
        }
    },
    created(){
        this.getAllReturnRequests();
    },
    methods:{
        getAllReturnRequests(){
            this.$axios.get('/getAllReturnedDevices').then((res)=>{
                this.tableData = [...res.data];
                this.loading = false;
            });
        },
    }
}
</script>

<style scoped>

</style>