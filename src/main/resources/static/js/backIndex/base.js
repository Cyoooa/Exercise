function fnW(str) {
    var num;
    str >= 10 ? num = str : num = "0" + str;
    return num;
}

//初始化信息
    //测试次数初始化
indexCountInit();
    //性别分布初始化
indexSexInit();
    //测试分数初始化
indexScoreInit();



function indexNewsInit(){
    $.ajax({
        url: "news/getNewsInfo",
        type: "post",
        dataType: "JSON",
        data: {
            pagesize: 4,
            currpage: 1
        },
        success :function (resp){
            if(resp.errmsg === 'ok'){
                newsShow(resp.data.list);
            }
        }
    })
}

function newsShow(data){
    if (data!=null){
        var table = $('#newslist');
        table.html("");
        var str = ``;
        for (let i = 0; i <data.length ; i++) {
            var content = beautySub(data[i].newsContent,5);
            str += `<tr>
                    <td>${data[i].newsTitle}</td>
                    <td>${content}</td>
                    <td>${data[i].newsDate}</td>
                    </tr>`
        }
        table.html(str);
    }
}



function indexScoreInit(){
    $.ajax({
        url: "getScoreInfo",
        type: "post",
        dataType: "JSON",
        data: {

        },
        success :function (resp){
            if(resp.errmsg === 'ok'){
                scoresInfoShow(resp.data.scores);
            }
        }
    })
}

function scoresInfoShow(data){
    var level1 = 0;//优秀
    var level2 = 0;//良
    var level3 = 0;//中
    var level4 = 0;//及格
    var level5 =  0;//不及格

    for (let i = 0; i <data.length ; i++) {
        if (data[i].score <60){
            level5+=1;
        }else if (data[i].score>=60 && data[i].score < 70){
            level4+=1;
        }else if (data[i].score>=70 && data[i].score < 80){
            level3+=1;
        }else if (data[i].score>= 80 && data[i].score <90) {
            level2+=1;
        }else{
            level1+=1;
        }
    }

    var pie_fanzui =echarts.init(document.getElementById("pie_fanzui"),'infographic');
    option = {
        title : {
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['优秀','良','中','及格','不及格'],
            textStyle: {color: '#fff'}
        },

        label: {
            normal: {
                textStyle: {
                    color: 'red'  // 改变标示文字的颜色
                }
            }
        },

        series : [
            {
                name: '用户测试结果分析',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:level1, name:'优秀(90-100)'},
                    {value:level2, name:'良(80-89)'},
                    {value:level3, name:'中(70-79)'},
                    {value:level4, name:'及格(60-69)'},
                    {value:level5, name:'不及格(60以下)'}
                ],

                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }

            }
        ]
    };
    pie_fanzui.setOption(option);
}
function indexSexInit(){
    $.ajax({
        url: "getSexInfo",
        type: "post",
        dataType: "JSON",
        data: {

        },
        success :function (resp){
            if(resp.errmsg === 'ok'){
                sexShow(resp.data);
            }
        }
    })
}


function sexShow(data){
    var level1 = data.male;
    var level2 = data.female;


    var pie_age =echarts.init(document.getElementById("pie_age"),'infographic');
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['男生数量','女生数量'],
            textStyle: {color: '#cee033'}
        },
        series: [
            {
                name:'用户性别统计',
                type:'pie',
                radius: ['30%', '55%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:level1, name:'男'},
                    {value:level2, name:'女'},
                ]
            }
        ]
    };
    pie_age.setOption(option);





    var qufenbu_data =echarts.init(document.getElementById("qufenbu_data"),'infographic');
    option = {
        color: ['#FFFFFF'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            x:30,
            y:10,
            x2:15,
            y2:20
        },
        xAxis : [
            {
                type : 'category',
                data : ['男', '女'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    color: "#FADB71" //刻度线标签颜色
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel: {
                    color: "#FADB71" //刻度线标签颜色
                }
            }
        ],
        series : [
            {
                name:'男女比例',
                type:'bar',
                barWidth: '60%',
                data:[level1, level2]
            }
        ]
    };

    qufenbu_data.setOption(option);
}
function indexCountInit(){
    $.ajax({
        url: "getCountNum",
        type: "post",
        dataType: "JSON",
        data: {

        },
        success :function (resp){
            if(resp.errmsg === 'ok'){
                countUserShow(resp.data.count);
            }
        }
    })
}
function countUserShow(count){
    $('#countUser').html(count);
}




//------
// //中国地图开始
// //var china_map =echarts.init(document.getElementById("china_map"),'macarons'); 
// var china_map =echarts.init(document.getElementById("china_map"),'infographic'); 
// //var china_map =echarts.init(document.getElementById("china_map"),'shine'); 


// function randomData() {
// 		return Math.round(Math.random()*500);
// 	}
 
// 	var mydata = [
// 		{name: '北京',value: randomData() },{name: '天津',value: randomData() },
// 		{name: '上海',value: randomData() },{name: '重庆',value: randomData() },
// 		{name: '河北',value: randomData() },{name: '河南',value: randomData() },
// 		{name: '云南',value: randomData() },{name: '辽宁',value: randomData() },
// 		{name: '黑龙江',value: randomData() },{name: '湖南',value: randomData()},
// 		{name: '安徽',value: randomData() },{name: '山东',value: randomData() },
// 		{name: '新疆',value: randomData() },{name: '江苏',value: randomData() },
// 		{name: '浙江',value: randomData() },{name: '江西',value: randomData() },
// 		{name: '湖北',value: randomData() },{name: '广西',value: randomData() },
// 		{name: '甘肃',value: randomData() },{name: '山西',value: randomData() },
// 		{name: '内蒙古',value: randomData() },{name: '陕西',value: randomData()},
// 		{name: '吉林',value: randomData() },{name: '福建',value: randomData() },
// 		{name: '贵州',value: randomData() },{name: '广东',value: randomData() },
// 		{name: '青海',value: randomData() },{name: '西藏',value: randomData() },
// 		{name: '四川',value: randomData() },{name: '宁夏',value: randomData() },
// 		{name: '海南',value: randomData() },{name: '台湾',value: randomData() },
// 		{name: '香港',value: randomData() },{name: '澳门',value: randomData() }
// 	];
 
// 	var option = {
// 		//backgroundColor: '#FFFFFF',
		
// 		title: {
// 			text: '犯罪人口来源分析',
// 			textStyle:{color:'#fff'},
// 			//subtext: '纯属虚构',
// 			x:'center'
// 		},
// 		tooltip : {
// 			trigger: 'item'
// 		},
// 		visualMap: {
// 			show : false,
// 			x: 'left',
// 			y: 'bottom',
// 			//layoutCenter:['30%','30%'],
// 			splitList: [ 
// 				{start: 500, end:600},{start: 400, end: 500},
// 				{start: 300, end: 400},{start: 200, end: 300},
// 				{start: 100, end: 200},{start: 0, end: 100},
// 			],
// 			color: ['#ff0', '#ffff00', '#0E94EB','#6FBCF0', '#F0F06F', '#00CC00']
// 		},
// 		series: [{
// 			name: '犯罪人口来源分析',
// 			type: 'map',
// 			mapType: 'china', 
// 			roam: true,
// 			label: {
// 				normal: {
// 					show: false
// 				},
// 				emphasis: {
// 					show: false
// 				}
// 			},
// 			data:mydata
// 		}]
// 	};

// china_map.setOption(option);
// //中国地图结束







//获取当前时间
var timer = setInterval(function () {
    var date = new Date();
    var year = date.getFullYear(); //当前年份
    var month = date.getMonth(); //当前月份
    var data = date.getDate(); //天
    var hours = date.getHours(); //小时
    var minute = date.getMinutes(); //分
    var second = date.getSeconds(); //秒
    var day = date.getDay(); //获取当前星期几 
    var ampm = hours < 12 ? 'am' : 'pm';
    $('#time').html(fnW(hours) + ":" + fnW(minute) + ":" + fnW(second));
    $('#date').html('<span>' + year + '/' + (month + 1) + '/' + data + '</span><span>' + ampm + '</span><span>周' + day + '</span>')

}, 1000)







//===================人口出入时间段统计=======================
//var line_time =echarts.init(document.getElementById("line_time"),'shine'); 
var line_time =echarts.init(document.getElementById("line_time"),'macarons'); 
//var line_time =echarts.init(document.getElementById("line_time"),'infographic'); 
var option = {
        // 给echarts图设置背景色
        //backgroundColor: '#FBFBFB',  // -----------> // 给echarts图设置背景色
        color: ['#7FFF00'],
        tooltip: {
            trigger: 'axis'
        },
       
		grid:{
                    x:40,
                    y:30,
                    x2:5,
                    y2:20
                    
                },
        calculable: true,


        xAxis: [{
             type: 'category',
        data: ['6:00-9:00', '10:00-12:00', '13:00-15:00', '16:00-20:00', '21:00-24:00'],
     axisLabel: {
			color: "#7FFF00" //刻度线标签颜色
			}
        }],
        yAxis: [{

            type: 'value',
            axisLabel: {
			color: "#7FFF00" //刻度线标签颜色
			}
        }],
        series: [{
            name: '人次',
            type: 'line',
            data: [800, 300, 500, 800, 300, 600],
            
        }]
    };


line_time.setOption(option);



//=========违法犯罪人员地区分布结束=======================


//时间选择器
var startV = '';
var endV = '';
laydate.skin('danlan');
var startTime = {
    elem: '#startTime',
    format: 'YYYY-MM-DD',
    min: '1997-01-01', //设定最小日期为当前日期
    max: laydate.now(), //最大日期
    istime: true,
    istoday: true,
    fixed: false,
    choose: function (datas) {
        startV = datas;
        endTime.min = datas; //开始日选好后，重置结束日的最小日期
    }
};
var endTime = {
    elem: '#endTime',
    format: 'YYYY-MM-DD',
    min: laydate.now(),
    max: laydate.now(),
    istime: true,
    istoday: true,
    fixed: false,
    choose: function (datas) {
        //        startTime.max = datas; //结束日选好后，重置开始日的最大日期
        endV = datas;
    }
};

laydate(startTime);
laydate(endTime);

//时间选择器
var startVs = '';
var endVs = '';
laydate.skin('danlan');
var startTimes = {
    elem: '#startTimes',
    format: 'YYYY-MM-DD',
    min: '1997-01-01', //设定最小日期为当前日期
    max: '2099-06-16', //最大日期
    istime: true,
    istoday: true,
    fixed: false,
    choose: function (datas) {
        startVs = datas;
        endTimes.min = datas; //开始日选好后，重置结束日的最小日期
        setQgData($('#barTypes').parent().parent(), 1);
    }
};
var endTimes = {
    elem: '#endTimes',
    format: 'YYYY-MM-DD',
    min: laydate.now(),
    max: laydate.now(),
    istime: true,
    istoday: true,
    fixed: false,
    choose: function (datas) {
        //        startTime.max = datas; //结束日选好后，重置开始日的最大日期
        endVs = datas;
        setQgData($('#barTypes').parent().parent(), 1);
    }
};

laydate(startTimes);
laydate(endTimes);




//更改日期插件的样式
function dateCss() {
    var arr = $('#laydate_box').attr('style').split(';');
    var cssStr =
        'position:absolute;right:0;';
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].indexOf('top') != -1) {
            cssStr += arr[i];
        }
    }

    $('#laydate_box').attr('style', cssStr);
}


var workDate;
var time = {
    elem: '#times',
    format: 'YYYY-MM-DD',
    min: laydate.now(),
    max: laydate.now() + 30,
    istime: true,
    istoday: true,
    fixed: false,
    choose: function (datas) {
        //        startTime.max = datas; //结束日选好后，重置开始日的最大日期
        workDate = datas;
    }
};

laydate(time);



function beautySub(str, len) {
    var reg = /[\u4e00-\u9fa5]/g,    //专业匹配中文
        slice = str.substring(0, len),
        chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length)),
        realen = slice.length*2 - chineseCharNum;
    return str.substr(0, realen) + (realen < str.length ? "..." : "");
}