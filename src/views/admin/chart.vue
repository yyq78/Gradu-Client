<template>
    <div id="charts">
        <!-- <div id="main" style="width: 600px;height:400px;"></div> -->
        <el-card class="box-card">
            <div id="storage" style="width: 100%;height:500px;">   
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            counts:[],
        }
    },
    methods:{
        drawChart() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("storage"));
        // 指定图表的配置项和数据
        let option = {
            title: {
            text: "库存分析"
            },
            tooltip: {},
            legend: {
            data: ["库存量"]
            },
            xAxis: {
                data: ["电脑", "打印机", "扫描仪", "投影仪", "白板", "会议平板一体机"],
                axisLabel:{
                    interval:0,
                    rotate:40,
                },
            },
            grid:{
                left:'10%',
                bottom:'15%',
            },
            yAxis: {},
            series: [
            {
                name: "库存量",
                type: "bar",
                data: [5, 20, 36, 10, 10, 20]
            },
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        }
    },
    mounted(){
        this.drawChart();
    }
}
</script>

<style scoped>
#charts{
    width:100%;
    height:100%;
    overflow-y: scroll;
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
    width: 480px;
}
#storage{
    width:100%;
    height:600px;
}
</style>