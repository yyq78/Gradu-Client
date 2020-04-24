<template>
    <div class="useApprove-wrap">
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
                    <el-button @click="handleClick(scope.row)" type="text" size="small">通过</el-button>
                    <el-button @click="handleRefuse(scope.row)" type="text" size="small" style="color:rgb(255,122,128);">拒绝</el-button>
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
        <el-dialog title="申请批复" :visible.sync="dialogVisible" width="30%">
            <el-form :model="form" :rules="rules" ref="form" size="mini">
                <el-form-item label="拒绝理由" prop="reason">
                    <el-input  type="textarea" v-model="form.reason" autocomplete="off" placeholder="请输入拒绝理由"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="refuseApprove">确 定</el-button>
            </span>
        </el-dialog>
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
          dialogVisible:false,
          form:{
              requestId:"",
              reason:""
          },
          rules:{
              reason:[
                  {required:true,message:'请输入理由',trigger:'blur'}
              ]
          }
        }
    },
    created(){
        this.getAllUseRequests();
    },
    methods:{
        handleSizeChange(val) {
            this.pageSize = val;
            this.getAllUseRequests();
        },
        handleChange(){
            this.currentPage= 1;
            debounce(this.getAllUseRequests());
        },            
        current_change(currentPage){
            this.currentPage = currentPage;
            this.getAllUseRequests();
        },
        getAllUseRequests(){
            this.$axios.get(`/getAllUseRequests?search=${this.search}&pageSize=${this.pageSize}&currentPage=${this.currentPage}`).then((res)=>{
                this.tableData = res.data;
                this.total = res.total;
                this.loading = false;
            });
        },
        handleClick(row){
            this.$axios.post('/reduceUseApprove',row).then((res)=>{
                if(res){
                    this.tableData = this.tableData.filter((item)=>item.requestId!==row.requestId);
                    this.$message.success('审批成功');
                }
            });
        },
        handleRefuse(row){
            this.dialogVisible = true;
            this.form.requestId = row.requestId;
        },
        refuseApprove(){
            this.$axios.post('/refuseUseApprove',this.form).then((res)=>{
                if(res){
                    this.tableData = this.tableData.filter((item)=>item.requestId!==this.form.requestId);
                    this.$message.success('审批成功');
                    this.dialogVisible = false;
                }
            })
        }
    }
}
</script>

<style scoped>
.main{
    display:flex;
    flex-direction: column;
}
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