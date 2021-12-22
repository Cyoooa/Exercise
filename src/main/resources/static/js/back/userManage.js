var pageSize = 5;
var currPage = 1;
var pager = $('#pager');
var userInfos = undefined;
var userIds = 0;
//获取用户信息
getUserInfo();
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
    getUserInfo();
}

//获取所有的用户信息
function getUserInfo(){
    var username = $('#Susername').val();
    $.ajax({
        url: "getUserInfo",
        type: "post",
        dataType: "JSON",
        data: {
            username,pageSize,currPage
        },
        success: function(resp) {
            if(resp.errmsg === 'ok'){

                userInfoShow(resp.data.userInfo);
                pager.data('zui.pager').set(currPage , resp.data.count , null);
            }
        },
        error: function(err) {
            console.log(err)
        }
    })
}


function userInfoShow(data){
    userInfos = data;
    if (data!=null) {
        var table = $('#tableBody');
        table.html("");
        var str =``;
        for (let i = 0; i < data.length; i++) {
            var roles = "用户";
            if (data[i].roleId===0){
                roles = "管理员"
            }
            console.log(data[i]);
            str +=`
            <tr>
            <td>${data[i].userId}</td>
            <td>${data[i].nickName}</td>
            <td>${data[i].sex}</td>
            <td>${roles}</td>
            <td>
                <button onclick='updateUser(${data[i].userId})' class=\"btn btn-primary\">编辑</button>
                <button onclick='delUser(${data[i].userId})' class=\"btn btn-primary\">删除</button>
            </td>
            `
        }
        table.html(str);
    }
}


function uploadBook(){
    $('#uploadBook1').modal();
}
//搜索
function doSearch(){
    currPage = 1;
    getUserInfo();
}
//删除绘本


function delUser(userId){
    layer.confirm('确定删除该用户？', {
        btn: ['确定','取消'] //按钮
    }, function (){
        $.ajax({
            url : 'delUser',
            type :'post',
            dataType : 'json',
            data:{
                userId
            },
            success: function(resp) {
                if(resp.errmsg === 'ok'){
                    layer.alert("删除用户成功！", {icon: 1});
                    getUserInfo();
                    return;
                }
                layer.msg(resp.errmsg, {icon: 2});
            },
            error: function(err) {
                console.log(err)
            }
        })

    },function (){
        return;
    });
}



//保存信息
function updateInfo(){
    var nickName = $('#username').val().trim();
    if (nickName==null||nickName==""){
        layer.alert("请输入用户名");
        return;
    }
    var sex = document.getElementsByClassName("sex");
    var sexs = "";
    for (var i = 0; i < sex.length; i++) {
        if (sex[i].checked){
            sexs = sex[i].value;
        }
    }

    var role = document.getElementsByClassName("roleId");
    var roleId = undefined;
    for (var i = 0; i < sex.length; i++) {
        if (role[i].checked){
            roleId = role[i].value;
        }
    }

    $.ajax({
        url : 'updateUserInfo',
        type :'post',
        dataType : 'json',
        data:{
            userId:userIds,
            sex:sexs,
            nickName,
            roleId
        },
        success: function(resp) {
            if(resp.errmsg === 'ok'){
                layer.alert("修改成功！", {icon: 1});
                getUserInfo();
                return;
            }
            layer.msg(resp.errmsg, {icon: 2});
        },
        error: function(err) {
            console.log(err)
        }
    })
    $('#updateUserInfo').modal('hide', 'fit');

}



function addUser(){
    $('#addUserInfo').modal();
}

function addInfoOk(){
    var userName = $('#Ausername').val().trim();
    if (userName==null||userName==""){
        layer.alert("请输入用户名");
        return;
    }
    var password = $('#Apassword').val()
    if (password==null||password==""){
        layer.alert("请输入密码");
        return;
    }
    var phone = $('#Aphone').val().trim();
    if (phone==null||phone==""){
        layer.alert("请输入手机号");
        return;
    }
    var email = $('#Aemail').val().trim();
    if (email==null||email==""){
        layer.alert("请输入邮箱");
        return;
    }

    $.ajax({
        url : 'addUserInfo',
        type :'post',
        dataType : 'json',
        data:{
            userName,password,phone,email
        },
        success: function(resp) {
            if(resp.errmsg === 'ok'){
                layer.alert("添加成功！", {icon: 1});
                getUserInfo();
                return;
            }
            layer.msg(resp.errmsg, {icon: 2});
        },
        error: function(err) {
            console.log(err)
        }
    })
    $('#addUserInfo').modal('hide', 'fit');
}
function updateUser(userId){
    userIds = userId;
    for (let i = 0; i < userInfos.length; i++) {
        if (userId == userInfos[i].userId) {
            userDetailShow(userInfos[i]);
            return;
        }
    }
}

function userDetailShow(data){
    $('#Uusername').val(data.nickName);
    var sex = document.getElementsByClassName("sex");
        if (data.sex == '男'){
            sex[0].checked = true;
        }else {
            sex[1].checked = true;
        }
    var roles = document.getElementsByClassName("roleId");
    if (data.roleId==0){
        roles[0].checked = true;
    }else {
        roles[1].checked = true;
    }
    $('#updateUserInfo').modal();



    var sexs = "";
    for (var i = 0; i < sex.length; i++) {
        if (sex[i].checked){
            sexs = sex[i].value;
        }
    }

}