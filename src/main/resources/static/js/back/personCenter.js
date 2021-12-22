initUser();

function initUser(){
    $.ajax({
        url:"getUserInfos",
        type:"post",
        dataType:"json",
        data:{

        },
        success:function(data){
            if (data.errmsg== 'ok'){
                showUser(data.data.user);
                return ;
            }
            layer.data(data.errmsg);
        },
        error:function(err){
            console.log(err)
        }
    })
}

function showUser(data){
    $('#nickname').val(data.nickName);
    $('#username').val(data.userName);
    $('#phone').val(data.phone);
    var sex = document.getElementsByName("sex");
    if (data.sex == '男'){
        sex[0].checked = true;
    }else {
        sex[1].checked = true;
    }




    var sexs = "";
    for (var i = 0; i < sex.length; i++) {
        if (sex[i].checked){
            sexs = sex[i].value;
        }
    }
}



function updateCommit(){
    var userName = $('#username').val().trim();
    var nickName = $('#nickname').val().trim();
    if (nickName==null||nickName==""){
        layer.alert("请输入用户名");
        return;
    }

    var phone = $('#phone').val().trim();
    if (phone==null||phone==""){
        layer.alert("请输入手机号");
        return;
    }



    var sex = document.getElementsByName("sex");
    var sexs = "";
    for (var i = 0; i < sex.length; i++) {
        if (sex[i].checked){
            sexs = sex[i].value;
        }
    }



    $.ajax({
        url : 'updateUsers',
        type :'post',
        dataType : 'json',
        data:{
            userName,
            nickName,
            phone,
            sex:sexs
        },
        success: function(resp) {
            if(resp.errmsg === 'ok'){
                initUser();
                layer.alert("修改成功！", {icon: 1});
                return;
            }
            layer.msg(resp.errmsg, {icon: 2});
        },
        error: function(err) {
            console.log(err)
        }
    })
}

function updatePassword(){
    $('#passwordModal').modal();
}

function updatePsw(){
    if ($('#newpsw').val()==null||$('#renewpsw').val()==null){
        layer.alert("密码不能为空！");
        return ;
    }
    if ($('#newpsw').val() != $('#renewpsw').val()){
        layer.alert("两次新密码输入不相同！");
        return ;
    }

    $.ajax({
        url:"updatePsw",
        type:"post",
        dataType:"json",
        data:{
            oldpsw:$('#oldpsw').val(),
            newpsw:$('#newpsw').val(),
        },
        success:function(data){
            if (data.errmsg== 'ok'){
                layer.alert('修改成功');
                $('#passwordModal').modal('hide', 'fit');
                return ;
            }
            layer.data(data.errmsg);
        },
        error:function(err){
            console.log(err)
        }
    })
}

