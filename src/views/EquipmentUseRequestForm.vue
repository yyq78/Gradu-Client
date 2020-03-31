<template>
    <div>
        <el-page-header @back="goBack" content="使用设备申请">
        </el-page-header>
        <el-card>
                <el-form ref="useRequestForm" :model="useRequestForm" :rules="rules" label-width="100px">
                    <el-form-item label="姓名" prop="personName">
                        <el-input v-model="useRequestForm.personName"></el-input>
                    </el-form-item>
                    <el-form-item label="工号" prop="personId">
                        <el-input v-model="useRequestForm.personId"></el-input>
                    </el-form-item>
                    <el-form-item label="部门" prop="personDepartment">
                        <el-input v-model="useRequestForm.personDepartment"></el-input>
                    </el-form-item>
                    <el-form-item label="设备名" prop="deviceName">
                        <el-input v-model="useRequestForm.deviceName"></el-input>
                    </el-form-item>
                    <el-form-item label="使用目的" prop="useAim">
                        <el-input type="textarea" v-model="useRequestForm.useAim"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit('useRequestForm')">申请</el-button>
                        <el-button  @click="reset('useRequestForm')">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
    </div> 
</template>
<script>
    export default{
        data(){
            return {
                useRequestForm:{
                    personName:"",
                    personId:"",
                    personDepartment:"",
                    deviceName:"",
                    useAim:"",
                },
                rules:{
                    personName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    personId:[
                        {type:'number',required:true,message:'请输入工号',trigger:'blur'}
                    ],
                    personDepartment:[
                        { required:true, message:'请输入部门名称',trigger:'blur'}
                    ],
                    deviceName:[
                        {required:true,message:'请输入使用设备名称',trigger:'blur'}
                    ],
                    useAim:[
                        {required:true,message:'请输入设备使用用途',trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            goBack(){
                this.$router.back();
            },
            submit(formName){
                this.$ref[formName].validate((valid)=>{
                    if(valid){
                        console.log('submit');
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                });
                console.log('submit');
            },
            reset(formName){
                this.$ref[formName].resetFields();
                console.log('reset');
            }
        }
    }
</script>
<style lang="less" scoped>
.el-page-header{
    line-height: 60px;
}
.el-card{
    width:500px;
}
</style>