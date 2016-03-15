$.ajax({
        url: '/api/Profile',
        type: 'GET',
        dataType: 'json',
    })
    .done(function(data) {
            console.log("success", data);
            if (data.succ != 0) { //succ?
                $.ajax({
                        url: '/api/login',
                        type: 'POST', //发空数据  为啥要再发？？直接没有跳到登录？？
                        dataType: 'json',
                    })
                    .done(function() {
                            console.log("success");
                            window.location.href = '/login.html'; //跳转到登录界面,游客要跳到登录界面，在点游客登录进来
                        }
                    })
            .fail(function() {
                console.log("error");
            })
        } else {
            networkRun(data); //成功时，把这时的数据传入
        }
    })
.fail(function() {
    console.log("error");
})

function networkRun(data) {
    //显示个人信息
    __info = data; //重新定义一个变量 安全
    //填写用户信息：积分 姓名
    $("#userddd").html(__info.display); //?
    $(".dropdown-menu").append('<li><a>积分 ' + data.score + '</a></li>');
    //根据用户的组别来添加对应的功能按钮
    if (__info.group == 0) { //组别 只保下拉菜单里面的注销                
        $(".dropdown-menu").find('li').eq('0').remove();
        $(".dropdown-menu").find('li').eq('0').remove();
        $(".dropdown-menu").find('li').eq('0').remove();
    };
    if (__info.group == 100) { //root 全屏蔽 行情到大厅 行情提醒 喊单 后台管理
        $(".dropdown-menu").append("<li id='power'><a>全屏蔽</a></li>");
        $(".dropdown-menu").append('<li class="divider"></li><li><a href="/htgl/admin.html">后台管理中心</a></li>');
        $("#sendBtn").after("<span class='pull-right' style='color:#fff;'>行情到大厅</span><input type='checkbox' name = 'lobby' class='pull-right'>");
        $("#sendBtn").after("<button class='btn btn-primary pull-right btn-sm' style='margin-left:2px;margin-right:2px;' id='ding'>行情提醒</button>");
        $("#sendBtn").after("<button class='btn btn-primary pull-right btn-sm' style='margin-left:2px;margin-right:2px;' id='callbill' data-toggle='modal' data-target='#myModal'>喊单</button>");
    }
    if (__info.group >= 92) {
        //主要大于92就都有后台管理
        $(".dropdown-menu").append('<li class="divider"></li><li><a href="/htgl/admin.html">后台管理中心</a></li>');
    }
    if (__info.group >= 95) { //分析师 行情到大厅 行情提醒 喊单模态框
        $("#sendBtn").after("<span class='pull-right' style='color:#fff;'>行情到大厅</span><input type='checkbox' name = 'lobby' class='pull-right'>");
        $("#sendBtn").after("<button class='btn btn-primary pull-right btn-sm' style='margin-left:2px;margin-right:2px;' id='ding'>行情提醒</button>");
        $("#sendBtn").after("<button class='btn btn-primary pull-right btn-sm' style='margin-left:2px;margin-right:2px;' id='callbill' data-toggle='modal' data-target='#myModal'>喊单</button>");
        $("#callbill").unbind('click').click(function(event) {
            /* Act on the event */
            // 在线喊单 模态框
            //首先获取产品类型 pro产品类型 产品类型参数不知道


        });
    }
    if (__info.group >= 50 && __info.group <= 89) { //这个用户组只添加了一个提问按钮
        $("#sendBtn").after("<button class='btn btn-primary pull-right' id='question'>提问</button>");
    }
    

}
