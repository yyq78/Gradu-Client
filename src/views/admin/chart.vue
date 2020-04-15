<template>
<div id="analys">
    <div class="charts">
        <el-card class="box-card">
            <div id="chart1" style="width: 100%;height:500px;">   
            </div>
        </el-card>
    </div>
    <div class="charts">
        <el-card class="box-card">
            <div id="chart2" style="width: 100%;height:500px;">   
            </div>
        </el-card>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            storageData:[],
            deviceName:[],
            count:[],
            pieData:[],
            times:[],
            outData:[],
            inData:[],
            outCountInMonth:[],
            inCountInMonth:[],
            countOfOut:[],
        }
    },
    methods:{
        drawChart1() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById("chart1"),'macarons');
            let _this = this;
            // 指定图表的配置项和数据
            let option = {
                    title: [{
                        text: '库存分析',
                    }, {
                        subtext: '不同设备的库存剩余量统计',
                        left: '30%',
                        top: '65%',
                        textAlign: 'center'
                    }, {
                        subtext: '不同设备的库存剩余占比统计',
                        left: '75%',
                        top: '65%',
                        textAlign: 'center'
                    }],
                    tooltip: {},
                xAxis: {
                    data:_this.deviceName,
                    axisLabel:{
                        interval:0,
                        rotate:40,
                    },
                },
                grid:{
                    x: '7%',
                    y: '15%',
                    width: '45%',
                    height: '40%'
                },
                yAxis: {
                    name: '剩余量',
                },
                series: [
                    {
                        name: "库存量",
                        type: "bar",
                        data: _this.count
                    },
                    {
                        type: 'pie',
                        name:'剩余量',
                        radius : '45%',
                        center: ['75%', '35%'],//饼图位置控制
                        data: _this.pieCount,
                        label:{
                            formatter: '{b} : ({d}%)'
                        }
                    },
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        drawChart2(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById("chart2"),'macarons');
            let _this = this;
            // 指定图表的配置项和数据
            let option = {
                    title: [{
                        text: '借入借出情况',
                    }, {
                        subtext: '年度借入借出情况统计',
                        left: '30%',
                        top: '65%',
                        textAlign: 'center'
                    },{
                        subtext: '不同设备的借出占比统计',
                        left: '75%',
                        top: '65%',
                        textAlign: 'center'
                    }
                    ],
                xAxis: {
                    data:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                },
                tooltip: {},
                legend: {
                    data: ['归还量', '借出量']
                },
                grid:{
                    x: '7%',
                    y: '15%',
                    width: '45%',
                    height: '40%'
                },
                yAxis: {
                    name: '数量',
                },
                series: [
                    {
                        name: "借出量",
                        type: "line",
                        data: _this.outCountInMonth
                    },
                    {
                        name: "归还量",
                        type: "line",
                        data: _this.inCountInMonth
                    },
                    {
                        type:'pie',
                        name:'借出量',
                        radius : '45%',
                        center: ['75%', '35%'],//饼图位置控制
                        data: _this.countOfOut,
                        label:{
                            formatter: '{b} : ({d}%)'
                        }
                    }

                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        getStorageData(){
            this.$axios.get('/getDevicesStorage').then((res)=>{
                this.storageData = res.data;
                this.handleStorageData();
                this.drawChart1();
            })
        },
        getInOutDeviceData(){
            let outDevice = this.$axios.get('/getAllRentedDevices').then((res)=>{
                this.outData = res.data;
                this.outCountInMonth = this.handleInOutData( res.data);
            })
            let inDevice = this.$axios.get('/getAllReturnedDevices').then((res)=>{
                this.inData = res.data;
                this.inCountInMonth = this.handleInOutData(res.data);
            });
            let countOfOut = this.$axios.get('/getCountofRentedDevices').then((res)=>{
                this.countOfOut = res.data.map((item)=>{
                    return {
                        name:item.deviceCategoryName,
                        value:item.count
                    }
                });
            })
            Promise.all([outDevice,inDevice,countOfOut]).then((res)=>{
                this.drawChart2();
            });
        },
        handleInOutData(data){
            //每月借出数量
            let obj=[0,0,0,0,0,0,0,0,0,0,0,0];
            for(let i=0;i<data.length;i++){
                let date;
                //提取年月日(数组)
                if(data[i].useDateTime){
                    date = this.formatDate(data[i].useDateTime);
                }else{
                    date = this.formatDate(data[i].returnDateTime);
                }
                let month = date[1];
                obj[month-1]+=1;
            }
            return obj;
        },
        formatDate(str){
            let arr;
            str = str.replace(/[^\d]+/g," ");
            arr = str.split(" ");
            arr = arr.filter(item=>item!=='');
            arr = arr.map(el =>  Number(el));
           return arr;
        },
        handleStorageData(){
                this.deviceName = this.storageData.map((item)=>item.deviceName);
                this.count = this.storageData.map((item)=>item.count);
                this.pieCount = this.storageData.map((item)=>{return {name:item.deviceName,value:item.count}});
        }
    },
    mounted(){
        this.getStorageData();
        this.getInOutDeviceData();
    }
}
</script>

<style scoped>
#analys{
    width:100%;
    height:100%;
    overflow-y:scroll;
}
.charts{
    display: flex;
    justify-content: space-around;
    height:400px;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.box-card {
    width: 100%;
}
#storage{
    width:100%;
    height:400px;
}
</style>