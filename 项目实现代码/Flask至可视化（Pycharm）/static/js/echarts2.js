let data2 = [];
let name2 = [];

$.when(
    $.getJSON('http://127.0.0.1:5000/book_num')
).done(function (res) {

    for(var i=0; i<res.length; i++) {
        data2.push(parseInt(res[i].num));
        name2.push(res[i].book);
    };

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart2'));

    var option = {
            //  backgroundColor: '#00265f',
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow'}
                },
            grid: {
                left: '0%',
                top:'10px',
                right: '0%',
                bottom: '4%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: name2,
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
                axisLabel:  {
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
                },
                inverse: true,
                animationDuration: 300,
                animationDurationUpdate: 300,
                max: 9
            }],
            yAxis: [{
                type: 'value',
                max: 'dataMax',
                axisLabel: {
                    //formatter: '{value} %'
                    show:true,
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
                    data: data2,
                    // barWidth:'35%', //柱子宽度
                    // barGap: 1, //柱子之间间距
                    itemStyle: {
                        normal: {
                            color:'#00d887',
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
            url: 'http://127.0.0.1:5000/book_num',
            dataType: "json",
            async: false,
            success: function(res0) {
                console.log(res0);
                for(var i=0; i<res0.length; i++) {
                    // console.log(item.press)
                    data2[i] = parseInt(res0[i].num);
                    name2[i] = res0[i].book;

                    // data2.push(parseInt(res0[i].num));
                    // name2.push(res0[i].book);
                };
                // console.log(data2)
                // console.log(name0)
                myChart.setOption(option);
            }
        })
        // $("#echart2").load(location.href+" #echart2", "");
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