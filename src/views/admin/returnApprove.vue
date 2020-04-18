<template>
    <div class="returnApprove-wrap">
        <div class="bar">
            <el-input
                style="width:255px"
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
                @input="handleChange">
            </el-input>
        </div>
          <el-table :data="tableData" stripe border class="table" height="300" v-loading="loading">
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
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">完成</el-button>
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
</template>

<script>
import debounce from '../../utils/debounce';
export default {
    data(){
        return {
          tableData:[],
          loading:true,
          search:'',
          pageSize:5,
          currentPage:1,
          total:0,
        }
    },
    created(){
        this.getAllReturnRequests();
    },
    methods:{
        handleSizeChange(val) {
            this.pageSize = val;
            this.getAllReturnRequests();
        },
        handleChange(){
            this.currentPage= 1;
            debounce(this.getAllReturnRequests());
        },            
        current_change(currentPage){
            this.currentPage = currentPage;
            this.getAllReturnRequests();
        },
        getAllReturnRequests(){
            this.$axios.get(`/getAllReturnRequests?search=${this.search}&pageSize=${this.pageSize}&currentPage=${this.currentPage}`).then((res)=>{
                this.tableData = res.data;
                this.total = res.total
                this.loading = false;
            });
        },
        handleClick(row){
            this.$axios.post('/reduceReturnRequests',row).then((res)=>{
                if(res){
                    this.tableData = this.tableData.filter((item)=>item.requestId!==row.requestId);
                }
            });
        }
    }
}
</script>

<style scoped>
.bar{
    text-align: right;
}
.table{
    margin-top:12px; 
}
.right{
    text-align: right;
}
</style>