<template>
    <div class="devices-wrap">
        <el-button type="text" @click="dialogVisible = true">
            <i class="el-icon-edit-outline"></i>
            <span>添加新设备</span>
        </el-button>
        <el-table :data="devices" stripe border class="table" max-height="300" v-loading="loading">
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
            label="上次修改时间">
            </el-table-column>
             
        </el-table>
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
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy年MM月dd日">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDevices">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    
</template>
<script>
    export default{
        data(){
            return {
                devices:[],
                loading:true,
                dialogVisible:false,
                form: {
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
                }]
        },
            }
        },
        created(){
            this.getAllDevices();
        },
        methods:{
            getAllDevices(){
                //获取全部设备信息
                this.$axios.get('/getAllDevices').then((res)=>{
                    this.devices = [...res.data];
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

</style>