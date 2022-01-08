let data_map = []

$.when(
    $.getJSON('http://127.0.0.1:5000/city_num')
).done(function (res){
    console.log(res);
    data_map = res;
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('map_1'));
        // var data = [
        //     {name: '北京',value: Math.round(Math.random()*1000)},
        //     {name: '天津',value: Math.round(Math.random()*1000)},
        //     {name: '上海',value: Math.round(Math.random()*1000)},
        //     {name: '重庆',value: Math.round(Math.random()*1000)},
        //     {name: '河北',value: Math.round(Math.random()*1000)},
        //     {name: '河南',value: Math.round(Math.random()*1000)},
        //     {name: '云南',value: Math.round(Math.random()*1000)},
        //     {name: '辽宁',value: Math.round(Math.random()*1000)},
        //     {name: '黑龙江',value: Math.round(Math.random()*1000)},
        //     {name: '湖南',value: Math.round(Math.random()*1000)},
        //     {name: '安徽',value: Math.round(Math.random()*1000)},
        //     {name: '山东',value: Math.round(Math.random()*1000)},
        //     {name: '新疆',value: Math.round(Math.random()*1000)},
        //     {name: '江苏',value: Math.round(Math.random()*1000)},
        //     {name: '浙江',value: Math.round(Math.random()*1000)},
        //     {name: '江西',value: Math.round(Math.random()*1000)},
        //     {name: '湖北',value: Math.round(Math.random()*1000)},
        //     {name: '广西',value: Math.round(Math.random()*1000)},
        //     {name: '甘肃',value: Math.round(Math.random()*1000)},
        //     {name: '山西',value: Math.round(Math.random()*1000)},
        //     {name: '内蒙古',value: Math.round(Math.random()*1000)},
        //     {name: '陕西',value: Math.round(Math.random()*1000)},
        //     {name: '吉林',value: Math.round(Math.random()*1000)},
        //     {name: '福建',value: Math.round(Math.random()*1000)},
        //     {name: '贵州',value: Math.round(Math.random()*1000)},
        //     {name: '广东',value: Math.round(Math.random()*1000)},
        //     {name: '青海',value: Math.round(Math.random()*1000)},
        //     {name: '西藏',value: Math.round(Math.random()*1000)},
        //     {name: '四川',value: Math.round(Math.random()*1000)},
        //     {name: '宁夏',value: Math.round(Math.random()*1000)},
        //     {name: '海南',value: Math.round(Math.random()*1000)},
        //     {name: '台湾',value: Math.round(Math.random()*1000)},
        //     {name: '香港',value: Math.round(Math.random()*1000)},
        //     {name: '澳门',value: Math.round(Math.random()*1000)}
        // ];

        var option = {
            title:{
                text:'电子图书下单数',
                left:'center',
                textStyle:{
                color:'#eee'
                }
            },
            tooltip : {
                trigger: 'item'
            },
            dataRange: {
                show: false,
                min: 0,
                max: 5,
                orient: 'horizontal',
                x: 'center',
                //y: 'top',
                text:['高','低'],           // 文本，默认为数值文本
                calculable : true,
                inRange: {
                    color: ['#58aaeb','#293fff'],
                    symbolSize: [30, 100]
                },
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                }
            },
            roamController: {
                show: false,
                x: 'right',
                mapTypeControl: {
                    'china': true
                }
            },
            series : [
                {
                    name: '下单数',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    itemStyle:{
                        normal:{label:{show:false}},
                        emphasis:{label:{show:true}}
                    },
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                    },
                    data: data_map
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
            url: 'http://127.0.0.1:5000/city_num',
            dataType: "json",
            async: false,
            success: function(res0) {
                var flag = [];
                for(var i=0; i<res0.length; i++) {
                    flag.push(parseInt(res0[i].value));
                };

                var max = Math.max.apply(null,flag);
                // console.log(max)

                data_map = res0;
                // console.log(res0);

                option.series[0].data = data_map;
                option.dataRange.max = max;
                myChart.setOption(option);
            }
        })
    }
		
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

