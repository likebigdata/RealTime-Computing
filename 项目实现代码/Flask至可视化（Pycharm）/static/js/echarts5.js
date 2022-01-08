let data5 = [];
let name5 = [];

$.when(
    $.getJSON('http://127.0.0.1:5000/source_num')
).done(function (res) {

    data5 = res;

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart5'));
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '0%',
            top: '10px',
            right: '0%',
            bottom: '4%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: name5,
            axisLine: {
                show: true,
                lineStyle: {
                    color: "rgba(255,255,255,.1)",
                    width: 1,
                    type: "solid"
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                // interval: 0,
                // rotate:50,
                formatter: function (value) {
                    if (value.length > 2) {
                        value = value.substring(0, 2) + "..";
                    }
                    return value;
                },
                show: true,
                splitNumber: 15,
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
                inverse: true,
                animationDuration: 300,
                animationDurationUpdate: 300,
                // max: 9
            },
        }],
        yAxis: [{
            type: 'value',
            max: 'dataMax',
            axisLabel: {
                //formatter: '{value} %'
                show: true,
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "rgba(255,255,255,.1	)",
                    width: 1,
                    type: "solid"
                },
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)",
                }
            }
        }],
        series: [
            {
                type: 'scatter',
                data: data5,
                itemStyle: {
                    normal: {
                        color:'#dddc6b',
                        opacity: 0.9,
                    }
                }
            }],
        animationDuration: 0,
        animationDurationUpdate: 500,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
    };

    function doing() {
        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:5000/source_num',
            dataType: "json",
            async: false,
            success: function(res0) {
                // data5 = res0;
                for(var i=0; i<res0.length; i++) {
                    // console.log(item.press)
                    data5[i] = parseInt(res0[i].value);
                    name5[i] = res0[i].name;
                };

                // option.series[0].data = data5;
                myChart.setOption(option);
            }
        })
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
    });

    setTimeout(function() {
        doing();
    }, 0);
    setInterval(function () {
        doing();
    }, 500);
})