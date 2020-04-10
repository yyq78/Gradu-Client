<template>
    <div class="useApprove-wrap">
          <el-table :data="tableData" stripe border class="table" height="500">
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
            prop="useDescription"
            label="使用理由"
            >
            </el-table-column>
            <el-table-column
            prop="useDateTime"
            label="预约时间"
            >
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">完成</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
          tableData:[],
        }
    },
    created(){
        this.getAllUseRequests();
    },
    methods:{
        getAllUseRequests(){
            this.$axios.get('/getAllUseRequests').then((res)=>{
                this.tableData = res.data;
            });
        },
        handleClick(row){
            this.$axios.post('/reduceUseApprove',row).then((res)=>{
                if(res){
                    this.tableData = this.tableData.filter((item)=>item.requestId!==row.requestId);
                }
            });
        }
    }
}
</script>

<style scoped>
.useApprove-wrap{
    flex:1;
    padding:24px;
    box-sizing: border-box;
    overflow-y: overlay;
}
</style>