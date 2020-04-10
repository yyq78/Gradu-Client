<template>
<div class="main">
    <el-menu class="nav">
        <el-menu-item index="1">
            <template slot="title">
                <router-link :to="{name:'devices'}" tag='div'>
                    <i class="el-icon-setting"></i>
                    <span>设备</span>
                </router-link>
            </template>
        </el-menu-item>
        <el-menu-item index="2">
            <template slot="title">
                <router-link :to="{name:'rentedDevices'}" tag='div'>
                    <i class="el-icon-menu"></i>
                    <span>设备租借情况</span>
                </router-link>
            </template>
        </el-menu-item>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>设备审批</span>
            </template>
            <el-menu-item index="3-1">
                <router-link :to="{name:'useApprove'}" tag='div'>
                    出库审批
                </router-link>
            </el-menu-item>
            <el-menu-item index="3-2">
                <router-link :to="{name:'returnApprove'}" tag='div'>
                入库审批
                </router-link>
            </el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
            <template slot="title">
                <router-link :to="{name:'rentedDevices'}" tag='div'>
                    <i class="el-icon-s-data"></i>
                    <span>统计图表</span>
                </router-link>
            </template>
        </el-menu-item>
    </el-menu>
    <router-view></router-view>
</div>
</template>
<script>
    export default{
        
    }
</script>
<style scoped>
.main {
    width: 100%;
    height: 100%;
    display: flex;
}
.nav{
    margin-top:24px;
    width:205px;
    height:calc(100%-24px);
    box-sizing: border-box;
}
</style>