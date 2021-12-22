
//获取登录用户的信息,并且鉴权。
getUserInfo();


function getUserInfo(){
    $.ajax({
        url:"getLoginInfo",
        type:"post",
        dataType:"json",
        data:{

        },
        success:function(data){
            roleFrame(data.data.admin);

        },

        error:function(err){
            console.log(err)
        }
    })
}


function roleFrame(data){
    $('#userInfo').html("欢迎您，"+data.nickName);
    if (data.roleId == 0){
        var data = `        <li>
            <a href="#" onclick="iframe('userManage')"><i class="icon icon-user"></i>用户管理</a>
        </li>
        <li>
            <a href="#" onclick="iframe('exerciseCenter')"><i class="icon icon-hand-right"></i>练习平台</a>
        </li>
        <li>
            <a href="#" onclick="iframe('historyManage')"><i class="icon icon-hand-right"></i>历史记录</a>
        </li>
        <li>
            <a href="#" onclick="iframe('countManage')"><i class="icon icon-hand-right"></i>数据统计</a>
        </li>
        <li>
            <a href="#" onclick="iframe('personCenter')"><i class="icon icon-hand-right"></i>个人中心</a>
        </li>`
        $('#menuTree').html(data);
    }else if (data.roleId == 1){
        var data = `
        <li>
            <a href="#" onclick="iframe('exerciseCenter')"><i class="icon icon-hand-right"></i>练习平台</a>
        </li>
        <li>
            <a href="#" onclick="iframe('historyManage')"><i class="icon icon-hand-right"></i>历史记录</a>
        </li>
        <li>
            <a href="#" onclick="iframe('personCenter')"><i class="icon icon-hand-right"></i>个人中心</a>
        </li>`
        $('#menuTree').html(data);
    }else {
        location.href='backLogin';
    }
}
//iframe切换
function iframe(url){
    $('#iframe').attr("src",url);
    console.log(url);
}
//退出
function exit(){
    layer.confirm('是否退出？', {
        btn: ['是','点错了'] //按钮
    }, function(){
        $.ajax({
            url:"exit",
            type:"post",
            dataType:"json",
            data:{

            },
            success:function(data){
                if (data.errmsg==='ok'){
                    location.href=data.data.location
                    return;
                }
                layer.msg(data.errmsg);
            },

            error:function(err){
                console.log(err)
            }
        })
    }, function(){
        return;
    });
}