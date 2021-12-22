function reg() {
    var userName = document.getElementById("userName").value;
    var acc = document.getElementById("acc").value;
    var psw = document.getElementById("psw").value;
    var phone = document.getElementById("phone").value;

    var sex = document.getElementsByClassName("sex");
    var sexs = "";
    for (var i = 0; i < sex.length; i++) {
        if (sex[i].checked){
            sexs = sex[i].value;
        }
    }
    if (userName == ""){
        layer.alert("请输入用户名！");
        return;
    }
    if (acc == ""){
        layer.alert("请输入账号！");
        return;
    }
    if (psw == ""){
        layer.alert("请输入密码！");
        return;
    }
    if (repsw == ""){
        layer.alert("请再次输入密码！");
        return;
    }
    if (phone == ""){
        layer.alert("请输入手机！");
        return;
    }


    $.ajax({
        url:"doRegister",
        type:"post",
        dataType:"JSON",
        data:{
            userName,
            acc,
            psw,
            sex:sexs,
            phone,
        },
        success: function(resp) {
            if (resp.errmsg === 'ok'){
                layer.alert("注册成功！3秒后进入登录界面");
                window.setTimeout("location.href= 'backLogin'",3000);
                // location.href = "login.html";
                return ;
                
            }
            layer.alert(resp.errmsg);

        },
        error: function(err) {
            console.log(err)
        }
    })
}
