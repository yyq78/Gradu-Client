<template>
    <div class="main">
        <el-page-header @back="goBack" content="归还设备申请">
        </el-page-header>
        <el-steps :active="step" finish-status="success">
            <el-step title="步骤一" description="填写申请人信息及申请设备信息"></el-step>
            <el-step title="步骤二" description="预约归还设备时间"></el-step>
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
                    <el-form-item label="归还设备" prop="deviceCategoryName">
                        <el-select v-model="requestBaseInfo.deviceCategoryName">
                            <el-option 
                            v-for="item in deviceCategoryList" 
                            :key="item.deviceName" 
                            :label="item.deviceName" 
                            :value="item.deviceName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="next('requestInfo')">下一步</el-button>
                        <el-button  @click="reset('requestInfo')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-else-if="step===1">
                <el-form ref="deviceInfo" :model="deviceInfo" :rules="deviceInfoRules" label-width="auto">
                    <el-form-item label="是否损坏" prop="isDamage">
                        <el-radio-group v-model="deviceInfo.isDamage">
                        <el-radio label="是" value="是"></el-radio>
                        <el-radio label="否" value="否"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="设备损耗情况" prop="damageDes">
                        <el-radio-group v-model="deviceInfo.damageDes">
                        <el-radio label="可以继续使用" value="可以继续使用"></el-radio>
                        <el-radio label="不能继续使用" value="不能继续使用"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="使用体验" prop="feedback">
                        <el-rate v-model="deviceInfo.feedback" show-text></el-rate>
                    </el-form-item>
                    <el-form-item label="预约归还设备时间" prop="dateTime">
                        <el-date-picker
                            v-model="deviceInfo.dateTime"
                            type="datetime"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>                    
                    <el-form-item>
                        <el-button @click="prev">上一步</el-button>
                        <el-button type="primary" @click="submit('deviceInfo')">确定</el-button>
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
                    deviceId:"",
                },
                deviceInfo:{
                    isDamage:"",
                    damageDes:"",
                    feedback:"",
                    dateTime:"",
                },
                deviceIdsList:[],
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
                },
                deviceInfoRules:{
                    isDamage:[
                        {required:true,message:'请选择是否损坏',trigger:'change'}
                    ],
                    damageDes:[
                        {required:true,message:'请选择设备损耗情况',trigger:'change'}
                    ],
                    feedback:[{
                        required:true,validator:this.checkRate,trigger:'change'
                    }],
                    dateTime:[
                        {required:true,message:'请选择预约归还时间',trigger:'change'}
                    ]
                },
                step:0,
            }
        },
        computed:{
            returnRequestForm(){
                return Object.assign({},this.requestBaseInfo,this.deviceInfo);
            }
        },
        methods:{
            goBack(){
                this.$router.back();
            },
            submit(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        this.$axios.post('/addReturnRequest',this.returnRequestForm).then((res)=>{
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
                
            },
            checkRate(rule, value, callback){
                if(!value){
                    return callback(new Error('请为设备评分'));
                }else{
                    callback();
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
.el-rate{
    padding-top:12px ;
}
</style>