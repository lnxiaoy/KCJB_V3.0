$(function() {
        $('[data-toggle="popover"]').popover();
    })
window.onload = function() {
    var _userLogin = document.getElementById('userLogin');//用户点击按钮
    var _travler = document.getElementById('travler');//游客体验 按钮   
    var login_userId=document.getElementById('login_userid');//用户名
    var usernameDiv = document.getElementById('_userName');//用户名提示框
    var login_passWord=document.getElementById('login_userpass');//密码
    var passwordDiv = document.getElementById('_passWord');//密码提示框
    var check1 = '';
    var check2 = '';
    $("#login_userid").focus(function(event) {
        usernameDiv.innerHTML = null;
    });
    $("#login_userid").blur(function(event) {     
        check1 = checkName(login_userId, usernameDiv);
    });
    $("#login_userpass").focus(function(event) {
        passwordDiv.innerHTML = null;
    });
    $('#login_userpass').blur(function(event) {
        check2 = checkPass(login_passWord, passwordDiv);
    });
    _userLogin.onclick = function() {
        if (check1 && check2) {
            $.ajax({
                    url: '/api/login',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        username: $("input[name='username']").val(),
                        password: $("input[name='password']").val(),
                        device: "web"
                    },
                })
                .done(function(data) {
                    console.log("success",data);
                    if(data.succ==0)
                    {
                        
                        window.location.href = "/index.html";
                    }
                })
                .fail(function() {
                    console.log("error");
                })
        } else {
            alert('输入信息不正确');
        }

    }
    _travler.onclick = function() {
        $.ajax({
            url: '/api/login',
            type: 'POST',
            dataType: 'json',
        })
        .done(function(data) {
            console.log("success",data);
            window.location.href='/index.html';

        })
        .fail(function() {
            console.log("error");
        })        
    }    
}
