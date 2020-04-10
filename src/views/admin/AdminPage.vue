<template>
<div class="main">
    <el-menu class="nav" :default-active="this.$route.path" router @select="handleSelect">
        <el-menu-item index="/index/admin/devices">
            <template slot="title">
                <div>
                    <i class="el-icon-setting"></i>
                    <span>设备</span>
                </div>
            </template>
        </el-menu-item>
        <el-menu-item index="/index/admin/rentedDevices">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>设备租借情况</span>
            </template>
        </el-menu-item>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>设备审批</span>
            </template>
            <el-menu-item index="/index/admin/useApprove">
                出库审批
            </el-menu-item>
            <el-menu-item index="/index/admin/returnApprove">
                入库审批
            </el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
            <template slot="title">
                    <i class="el-icon-s-data"></i>
                    <span>统计图表</span>
            </template>
        </el-menu-item>
    </el-menu>
    <div class="content">
        <div class="topNav">
            <el-tabs v-model="activeTabName" type="card" closable @tab-remove="removeTab" @tab-click="changeRoute">
                <el-tab-pane 
                v-for="item in tabPanes"
                :label="item.label"
                :name="item.name"
                :key="item.label"
                >
                </el-tab-pane>
            </el-tabs>
        </div>
        <router-view></router-view>
    </div>
    
</div>
</template>
<script>
    import {mapState,mapMutations} from 'vuex';
    export default{
        data(){
            return {
                tabMap:{
                    devices:'设备',
                    rentedDevices:'设备租借情况',
                    useApprove:'出库审批',
                    returnApprove:'入库审批',
                },
            }
        },
        computed:{
            ...mapState([
                'tabPanes',
                'activeName' 

            ]),
            activeTabName: {
                get:function() {
                    return this.activeName;
                },
                set: function(value){
                    this.changeActiveName(value)
                }
            }


        },
        methods:{
            changeRoute(target){
                //获得路径
                let name = target.name;
                let arr = name.split("/");
                let pathName = arr[arr.length-1];
                if(name!==this.activeTabName){
                    this.$router.push(pathName);
                }
            },
            removeTab(target){
                this.removeTabpane(target);
                //如果删除的tab是激活的tab
                if(target=== this.activeName){
                    let target = this.tabPanes[this.tabPanes.length-1];
                    let path = target.name;
                    //改变tab的激活项
                    this.changeActiveName(path);
                    //改变路由
                    this.changeRoute(target);

                }
            },
            handleSelect(key, keyPath) {
                //处理路径
                let arr = key.split("/");
                let route = arr[arr.length-1];
                //获得路径对应的菜单名字
                let name = this.tabMap[route];
                //如果tabpanes没有选项，就往tabpanes里添加该选项（选项卡名字）
                let checkHasTab = (item)=>item.label === name;
                if(!this.tabPanes.some(checkHasTab)){
                    this.addTabpane({
                        label:name,
                        name:key,
                    });
                }
                this.changeActiveName(key);
            },
            ...mapMutations([
                'changeActiveName',
                'addTabpane',
                'removeTabpane'
            ]),
        },
        created(){
            this.$router.replace({name:'devices'});
        },
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
}
.content{
    flex:1;
    padding:24px;
    overflow-y:overlay;
    display:flex;
    flex-direction:column;
    justify-content: start;
}

</style>