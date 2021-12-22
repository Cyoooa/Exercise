$(".form-date").datetimepicker(
    {
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        format: "yyyy-mm-dd"
    });

// 使用jquery方法获取 2d context 对象
var ctx = $("#myChart").get(0).getContext("2d");
// 或者使用 document.getElementById 获取 2d context 对象
// var ctx = document.getElementById("myChart").getContext("2d");

// 使用$.zui.Chart构造Chart实例
var myNewChart = new $.zui.Chart(ctx);

// 创建指定Canvas的Chart实例
var myChart = $("#myChart").chart();

// 以数组的形式返回所有canvas的Chart实例
var allMyCharts = $("canvas").chart();



var username = undefined;
historyInit();

var pageSize = 50;
var currPage = 1;
var pager = $('#pager');
var historyInfos = undefined;
var historyIds = 0;

//获取历史记录信息

pageInit();
function pageInit() {
    pager.pager({
        page :currPage,
        recTotal : 0,
        recPerPage : pageSize,
        onPageChange : changePage
    })
}
function changePage(newState , oldState) {
    if(newState.page === oldState.page){
        return ;
    }
    currPage = newState.page;
    getHistoryInfo();
}


//获取所有的用户信息
function getHistoryInfo(){
    var usernames = $('#username').val();
    if (usernames!=null&&''!=usernames){
        username=usernames;
    }
    var btime = $('#btime').val();
    var etime = $('#etime').val();
    $.ajax({
        url: "getHistoryInfo",
        type: "post",
        dataType: "JSON",
        data: {
            username,
            btime,etime,pageSize,currPage
        },
        success: function(resp) {
            if(resp.errmsg === 'ok'){
                historyInfoShow(resp.data.historyInfo);
                pager.data('zui.pager').set(currPage , resp.data.count , null);
            }
        },
        error: function(err) {
            console.log(err)
        }
    })
}

function historyInfoShow(data){
    if (data!=null) {
        var table = $('#tableBody');
        table.html("");
        var str =``;
        for (let i = 0; i < data.length; i++) {
            str +=`
            <tr>
            <td>${data[i].historyId}</td>
            <td>${data[i].userName}</td>
            <td>${data[i].number}</td>
            <td>${data[i].score}</td>
            <td>${data[i].datetime}</td>
            `
        }
        table.html(str);
    }
    viewShow(data);
}

function viewShow(data){
    $("#myChart").html();
    //统计最近10次图表
    var label = [];
    var scores = [];
    var a = 10;
    if (data.length<10){
        a = data.length
    }
    for (let i = 0; i < a; i++){
        label.push(data[i].datetime.substring(6,19));
        scores.push(data[i].score);
    }

    var datas = {
        // labels 数据包含依次在X轴上显示的文本标签
        labels: label,
        datasets: [{
            // 数据集名称，会在图例中显示
            label: "红队",

            // 颜色主题，可以是'#fff'、'rgb(255,0,0)'、'rgba(255,0,0,0.85)'、'red' 或 ZUI配色表中的颜色名称
            // 或者指定为 'random' 来使用一个随机的颜色主题
            color: "red",
            // 也可以不指定颜色主题，使用下面的值来分别应用颜色设置，这些值会覆盖color生成的主题颜色设置
            // fillColor: "rgba(220,220,220,0.2)",
            // strokeColor: "rgba(220,220,220,1)",
            // pointColor: "rgba(220,220,220,1)",
            // pointStrokeColor: "#fff",
            // pointHighlightFill: "#fff",
            // pointHighlightStroke: "rgba(220,220,220,1)",

            // 数据集
            data: scores
        }]
    };

    var options = {}; // 图表配置项，可以留空来使用默认的配置

    var myLineChart = $("#myChart").lineChart(datas, options);
}


//搜索
function doSearch(){
    currPage = 1;
    getHistoryInfo();
}

function historyInit(){
    $.ajax({
        url:"getLoginInfo",
        type:"post",
        dataType:"json",
        data:{

        },
        success:function(data){
            roleInit(data.data.admin);

        },

        error:function(err){
            console.log(err)
        }
    })
}

function roleInit(data){
    username = data.userName;
    if (data.roleId == 0){
        $('#username').css('display','block');
    }
    getHistoryInfo();
}

function showView(){
    $('#viewshow').modal();
}