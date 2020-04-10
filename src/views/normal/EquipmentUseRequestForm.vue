<template>
    <div class="main">
        <el-page-header @back="goBack" content="使用设备申请">
        </el-page-header>
        <el-steps :active="step" finish-status="success">
            <el-step title="步骤一" description="填写申请人信息及申请设备信息"></el-step>
            <el-step title="步骤二" description="预约取设备时间"></el-step>
            <el-step title="步骤三" description="完成"></el-step>
        </el-steps>
        <div class="useRequest">
            <div v-if="step===0">
                <el-form ref="requestInfo" :model="requestBaseInfo" :rules="requestBaseInfoRules" label-width="auto">
                    <el-form-item label="姓名" prop="personName">
                        <el-input v-model="requestBaseInfo.personName" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="工号" prop="personId">
                        <el-input v-model="requestBaseInfo.personId" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="部门" prop="personDepartment">
                        <el-input v-model="requestBaseInfo.personDepartment" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型" prop="deviceCategoryId">
                        <el-select v-model="requestBaseInfo.deviceCategoryName">
                            <el-option 
                            v-for="item in deviceCategoryList" 
                            :key="item.deviceName" 
                            :label="item.deviceName" 
                            :value="item.deviceName"
                            :disabled="!item.count"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用目的" prop="useAim">
                        <el-input type="textarea" v-model="requestBaseInfo.useAim"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="next('requestInfo')">下一步</el-button>
                        <el-button  @click="reset('requestInfo')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-else-if="step===1">
                <el-form ref="timeInfo" :model="timeInfo" :rules="dateTimeRules">
                    <el-form-item prop="dateTime">
                        <span class="demonstration">选择预约取设备时间</span>
                        <el-date-picker
                            v-model="timeInfo.dateTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            format="yyyy 年 MM 月 dd 日 hh点mm分ss秒"
                            value-format="yyyy年MM月dd日 hh点mm分ss秒">
                        </el-date-picker>
                    </el-form-item>                    
                    <el-form-item>
                        <el-button @click="prev">上一步</el-button>
                        <el-button type="primary" @click="submit('timeInfo')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-else class="bigTitle">
                恭喜您！申请成功
            </div>
        </div>
        

    </div> 
</template>
<script>
    export default{
        data(){
            return {
                requestBaseInfo:{
                    personName:"",
                    personId:"",
                    personDepartment:"",
                    deviceCategoryName:"",
                    useAim:"",
                },
                timeInfo:{
                    dateTime:"",
                },
                deviceCategoryList:[],
                requestBaseInfoRules:{
                    personName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    personId:[
                        {required:true, validator:this.checkNum,trigger:'blur'}
                    ],
                    personDepartment:[
                        { required:true, message:'请输入部门名称',trigger:'blur'}
                    ],
                    deviceCategoryName:[
                        { required:true,message:'请选择设备类型',trigger:'change'}
                    ],
                    useAim:[
                        {required:true,message:'请输入设备使用用途',trigger:'blur'}
                    ],
                },
                dateTimeRules:{
                    dateTime:[
                        {required:true,message:'请输入预约拿取时间',trigger:'change'}
                    ]
                },
                step:0,
            }
        },
        computed:{
            useRequestForm(){
                return Object.assign({},this.requestBaseInfo,this.timeInfo);
            }
        },
        methods:{
            goBack(){
                this.$router.back();
            },
            submit(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        this.$axios.post('/addUseRequest',this.useRequestForm).then((res)=>{
                            this.step++;
                            this.$message.success("恭喜您！申请成功");
                             this.step++;
                        });
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            reset(formName){
                this.$refs['useRequest'].resetFields();
            },
            getDeviceCategoryList(){
                this.$axios.get('/getDeviceCategoryList').then((res)=>{
                    this.deviceCategoryList = res.data;
                })
            },
            next(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        this.step++;
                        console.log('success submit');
                    }else{
                        console.log('error submit');
                        return false;
                    }
                });
            },
            reset(formName){
                this.$refs[formName].resetFields();
            },
            prev(){
                this.step--;
            },
            checkNum(rule, value, callback){
                if(!value){
                   return callback(new Error('请输入工号'));
                }else{
                    let reg = /^[0-9]+$/;
                    if(!reg.test(value)){
                        callback(new Error('请输入数字值'));
                    }else{
                        callback();
                    }
                }
                
            }
        },
        created(){
            this.getDeviceCategoryList();
        }
    }
</script>
<style lang="less" scoped>
.main{
    padding:12px 24px;
    width:100%;
    height:100%;
    box-sizing: border-box;
}
.el-page-header{
    line-height: 60px;
}
.useRequest{
    display:flex;
    justify-content: space-around;
}
.el-form{
    width:500px;
}
.demonstration{
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
}
.bigTitle{
    font-size:20px;
    font-weight:bold;
    line-height:30vh;
}
</style>