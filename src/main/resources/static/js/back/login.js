
//验证码刷新
function Code(){
    var img=document.getElementById("imgCode");
    img.src="code?p="+new Date();
}

function registers(){
    location.href="register";
}
//登录方法
function doLogin(){
    var accName = $('#username').val();
    var passWord = $('#password').val();
    var code = $('#code').val();
    $.ajax({
        url :"doLogin",
        type : 'POST',
        dataType : 'JSON',
        data:{
            accName,passWord,code
        },
        success:function (resp){
            console.log(resp)
            if(resp.errmsg === 'ok'){
                layer.alert("登陆成功");
                location.href = resp.data.location;
                return ;
            }
            layer.alert(resp.errmsg,{icon: 2});
            Code();
        }
    })
}