<template>
    <div class="devices-wrap">
        <div class="bar">
            <el-button class="add" type="text" @click="dialogVisible = true">
                <i class="el-icon-circle-plus-outline"></i>
                <span>添加新设备</span>
            </el-button>
            <el-input
                style="width:255px"
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
                @input="handleChange"
            >
            </el-input>
        </div>
        <el-table 
            :data="devices" 
            stripe 
            border 
            class="table" 
            v-loading="loading" 
            height="350px"
            :default-sort = "{prop: 'time', order: 'descending'}"
            >
            <el-table-column 
            prop="time"
            label="上次修改时间"
            sortable
            >
            </el-table-column>
            <el-table-column prop="deviceName" label="名称">
            </el-table-column>
            <el-table-column
            prop="count"
            sortable
            label="数量"
            >
            </el-table-column>
            <el-table-column
            prop="devicePrice"
            label="价格"
            sortable
            >
            </el-table-column>
            
            <el-table-column
                fixed="right"
                label="编辑"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">
                        <i class="el-icon-edit"></i>
                        <span>编辑</span>
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="删除"
                width="100">
                <template slot-scope="scope">
                    <el-button size="small" type="text" @click="handleDelete(scope.row)">
                        <i class="el-icon-delete"></i>
                        <span>删除</span>
                    </el-button>
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
            @current-change="current_change"
        >
        </el-pagination>
        <el-dialog title="新增设备" :visible.sync="dialogVisible" width="50%">
              <el-form :model="form" :rules="rules" ref="addForm">
                <el-form-item label="设备名称" :label-width="formLabelWidth" prop="deviceName">
                    <el-input v-model="form.deviceName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="添加数量" :label-width="formLabelWidth" prop="count">
                    <el-input-number v-model="form.count" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="设备价格" :label-width="formLabelWidth" prop="devicePrice">
                    <el-input-number v-model="form.devicePrice" :precision="2" :step="0.1"></el-input-number>
                </el-form-item>
                <el-form-item label="入库时间" :label-width="formLabelWidth" prop="time">
                    <el-date-picker
                    v-model="form.time"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDevices">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改设备" :visible.sync="ModifyDialogVisible" width="50%">
              <el-form :model="modifiedForm" :rules="rules" ref="addForm">
                <el-form-item label="设备名称" :label-width="formLabelWidth" prop="deviceName">
                    <el-input v-model="modifiedForm.deviceName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="添加数量" :label-width="formLabelWidth" prop="count">
                    <el-input-number v-model="modifiedForm.count" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="设备价格" :label-width="formLabelWidth" prop="devicePrice">
                    <el-input-number v-model="modifiedForm.devicePrice" :precision="2" :step="0.1"></el-input-number>
                </el-form-item>
                <el-form-item label="入库时间" :label-width="formLabelWidth" prop="time">
                    <el-date-picker
                    v-model="modifiedForm.time"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy年MM月dd日">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ModifyDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyDevices">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    
</template>
<script>
import debounce from '../../utils/debounce';
    export default{
        data(){
            return {
                devices:[],
                loading:true,
                dialogVisible:false,
                ModifyDialogVisible:false,
                search:'',
                pageSize:5,
                currentPage:1,
                total:0,
                form: {
                    deviceName: '',
                    count: 1,
                    devicePrice: 1.00,
                    time: '',
                },
                modifiedForm:{
                    deviceName: '',
                    count: 1,
                    devicePrice: 1.00,
                    time: '',
                },
                rules:{
                    deviceName: [
                        { required: true, message: '请输入设备名称', trigger: 'blur' }
                    ],
                    time:[
                        { required:true,message:'请选择入库时间',trigger:'change'}
                    ],
                },
                formLabelWidth: '120px',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                        picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                        }
                }],
                },
            }
        },
        created(){
            this.getAllDevices();
        },
        methods:{
            handleSizeChange(val) {
                this.pageSize = val;
                this.getAllDevices();
            },
            handleChange(){
                this.currentPage= 1;
                debounce(this.getAllDevices());
            },            
            current_change(currentPage){
                this.currentPage = currentPage;
                this.getAllDevices();
            },
            handleClick(row){
                this.modifiedForm = row;
                this.ModifyDialogVisible = true;
            },
            modifyDevices(){
                this.$axios.post('/modifySomeDevice',this.modifiedForm).then((res)=>{
                    this.$message.success('修改成功');
                    this.ModifyDialogVisible = false;
                    this.getAllDevices();
                })
            },
            handleDelete(row){
                this.$axios.post('/deleteSomeDevice',row).then((res)=>{
                    this.$message.success('删除成功');
                    this.getAllDevices();
                })
            },
            getAllDevices(){
                //获取全部设备信息
                this.$axios.get(`/getAllDevices?search=${this.search}&pageSize=${this.pageSize}&currentPage=${this.currentPage}`).then((res)=>{
                    this.devices = res.data;
                    this.total = res.total;
                    this.loading = false;
                });
            },
            addDevices(){
                this.$refs['addForm'].validate((valid)=>{
                    if(valid){
                        this.$axios.post('/addDevices',this.form).then((res)=>{
                            if(res.error==undefined){
                                this.$message.success('添加成功');
                                this.getAllDevices();
                            }else{
                                this.$message.error(res.error);
                            }
                            this.$refs['addForm'].resetFields();
                        })
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                });
                this.dialogVisible = false;
            }
        },
    }
</script>
<style scoped>
.table{
    margin-top:12px;
}
.bar{
    display:flex;
    justify-content: space-between;
}
.right{
    text-align:right;
}
</style>