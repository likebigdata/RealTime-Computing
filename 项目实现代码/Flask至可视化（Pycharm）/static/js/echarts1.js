let data1 = [];
let name1 = [];

$.when(
    $.getJSON('http://127.0.0.1:5000/press_num')
).done(function (res) {
    // console.log(res);

    for(var i=0; i<res.length; i++) {
        // console.log(res[i])
        // console.log(res[i].press)
        // console.log(item.press)
        data1.push(parseInt(res[i].num));
        name1.push(res[i].press);
    };

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart1'));

    var option = {
            //  backgroundColor: '#00265f',
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
                data: name1,
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
                    interval: 0,
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
                    type: 'bar',
                    data: data1,
                    // barWidth: '35%', //柱子宽度
                    // barGap: 1, //柱子之间间距
                    itemStyle: {
                        normal: {
                            color: '#dddc6b',
                            opacity: 1,
                            barBorderRadius: 5,
                        }
                    }
                }

            ],
        animationDuration: 0,
        animationDurationUpdate: 500,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
        };

    function doing() {
        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:5000/press_num',
            dataType: "json",
            async: false,
            success: function(res0) {
                for(var i=0; i<res0.length; i++) {
                    data1[i] = parseInt(res0[i].num);
                    name1[i] = res0[i].press;

                };
                myChart.setOption(option);
            }
        })

    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
    setTimeout(function() {
        doing();
    }, 0);
    setInterval(function () {
        doing();
    }, 500);
})