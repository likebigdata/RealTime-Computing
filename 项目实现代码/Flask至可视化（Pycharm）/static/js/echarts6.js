let data6_1 = [];
let data6_2 = [];
let data6_3 = [];

$.when(
    $.getJSON('http://127.0.0.1:5000/payment_num')
).done(function (res) {
    var placeHolderStyle = {
        normal: {
            color: 'rgba(255,255,255,.05)',
            label: {show: false,},
            labelLine: {show: false}
        },
        emphasis: {
            color: 'rgba(0,0,0,0)'
        }
    };
    console.log(res)
    data6_1.push(res[0]);
    data6_1.push(
        {
            value: 20,
            name: 'invisible',
            tooltip: {show: false},
            itemStyle: placeHolderStyle
        }
    )
    console.log(data6_1)
    data6_2.push(res[1]);
    data6_2.push(
        {
            value: 30,
            name: 'invisible',
            tooltip: {show: false},
            itemStyle: placeHolderStyle
        }
    )
    data6_3.push(res[2]);
    data6_3.push(
        {
            value: 40,
            name: 'invisible',
            tooltip: {show: false},
            itemStyle: placeHolderStyle
        }
    )


    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart6'));

    var dataStyle = {
        normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            //shadowBlur: 40,
            //shadowColor: 'rgba(40, 40, 40, 1)',
        }
    };
    option = {
        color: ['#0f63d6', '#0f78d6', '#0f8cd6', '#0fa0d6', '#0fb4d6'],
        tooltip: {
            show: true,
            formatter: "{a} : {c} "
        },
        legend: {
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 12,
            bottom: '3%',

            data: ['微信付款', '支付宝付款', '货到付款'],
            textStyle: {
                color: 'rgba(255,255,255,.6)',
            }
        },

        series: [
            {
                name: '微信付款',
                type: 'pie',
                clockWise: false,
                center: ['50%', '42%'],
                radius: ['59%', '70%'],
                itemStyle: dataStyle,
                hoverAnimation: false,
                data: data6_1
            },
            {
                name: '支付宝付款',
                type: 'pie',
                clockWise: false,
                center: ['50%', '42%'],
                radius: ['49%', '60%'],
                itemStyle: dataStyle,
                hoverAnimation: false,
                data: data6_2
            },
            {
                name: '货到付款',
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                center: ['50%', '42%'],
                radius: ['39%', '50%'],
                itemStyle: dataStyle,
                data: data6_3
            },
        ],
        animationDuration: 0,
        animationDurationUpdate: 500,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
    };

    function doing() {
        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:5000/payment_num',
            dataType: "json",
            async: false,
            success: function(res0) {
                // console.log(res0);
                data6_1[0] = res0[0];

                data6_2[0] = res0[1];

                data6_3[0] = res0[2];

                // option.series[0].data = data6_1;
                // option.series[1].data = data6_2;
                // option.series[2].data = data6_3;
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