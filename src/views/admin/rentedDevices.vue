<template>
    <div class="main">
        <div class="bar">
            <el-input
                style="width:255px"
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
                @input="handleChange">
            </el-input>
        </div>
        <el-table :data="rentedDevice" stripe border class="table" v-loading="loading" height="300">
            <el-table-column prop="deviceCategoryName" label="名称" sortable></el-table-column>
            <el-table-column
            prop="useDateTime"
            label="借出时间"
            sortable>
            </el-table-column>
            <el-table-column
            prop="userName"
            label="使用者"
            sortable>
            </el-table-column>
            <el-table-column
            prop="userDepartment"
            label="所在部门"
            sortable>
            </el-table-column>
            <el-table-column
            prop="userId"
            label="工号">
            </el-table-column>
            <el-table-column
            prop="useDescription"
            label="原因"
            sortable>
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
            @current-change="current_change"
        ></el-pagination>
    </div>
</template>

<script>
import debounce from '../../utils/debounce';
export default {
    data(){
        return {
            rentedDevice:[],
            loading:true,
            search:'',
            pageSize:5,
            currentPage:1,
            total:0,
        }
    },
    created(){
        this.getAllRentedDevice();
    },
    methods:{
        handleSizeChange(val) {
            this.pageSize = val;
            this.getAllRentedDevice();
        },
        handleChange(){
            this.currentPage= 1;
            debounce(this.getAllRentedDevice());
        },            
        current_change(currentPage){
            this.currentPage = currentPage;
            this.getAllRentedDevice();
        },
        getAllRentedDevice(){
            this.$axios.get(`/getAllRentedDevices?search=${this.search}&pageSize=${this.pageSize}&currentPage=${this.currentPage}`).then((res)=>{
                this.rentedDevice = res.data;
                this.total = res.total;
                this.loading = false;
            });
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