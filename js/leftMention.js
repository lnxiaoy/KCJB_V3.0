// 左下角行情提醒 粘贴历史消息 operation后台给的是什么形式??
$.ajax({
    url: '/api/Histories'+limit=5, //喊单记录 左下侧框 限制条数 怎么搞？、
    type:'GET',
    dataType: 'json',
})
.done(function(data) {
    for (var i = 0; i < data.length; i++) {
        // if (!data[i].finnishTime) data[i].finnishTime = data[i].createTime;
       
        // var preDate = data[i].finnishTime;
        var date = String(moment(preDate).format('YYYY-MM-DD HH:mm'));
        
        var from = data[i].FA;
        var product = data[i].product;//开仓类型
        
        var type = data[i].type;

        var type_format = /空/.test(type) ? '空单' : '多单';
        // var operation;
        // var operation = data[i].state; //操作状态号 增仓 减仓 开仓。。。state为状态码
        // 0:开 1：增 2:减 3：平 4：挂 5：成 6：撤

        var upPrice = data[i].upPrice;
        var lowPrice = data[i].lowPrice;
        var closePrice = data[i].closePrice;
        var openPrice = data[i].openPrice;
        // var lobby = data[i].lobby;
        // var reason = data[i].reason;
        var id = data[i].id;//单号
        var word, fword;
        var size,name;
        if (data[i].type === 'speaker') {

            $("#home").append("<p style='font-size:12px;'><span style='font-size:12px;color:#A73CC2'>【" + from + "】</span>建议，【<span style='font-size:12px;color:blue;'>行情提醒</span>】" + date + "<br><span style='font-size:12px;'>" + reason + "</span><br><span style='font-size:6px;color:grey;'>(以上建议仅供参考，投资有风险，操作需谨慎)</span></p>");
            document.getElementById('home').scrollTop = document.getElementById('home').scrollHeight; //home是第一个选项卡，
            document.getElementById('resize').scrollTop = document.getElementById('resize').scrollHeight; //resize是整个tab 设置了overflow=auto;
            continue; //如果是老师行情提醒，那么跳出本次循环，不进行平仓，减仓等判断操作
        }

        if (closePrice == upPrice) {//根据这两个参数来判断是什么状态
            word = "止盈平仓";
            fword = "止盈减仓";
        } else if (closePrice == lowPrice) {
            word = "止损平仓";
            fword = "止损减仓";
        }
        //判断状态号 封装成函数 把自动滚动也封装 css单独写
        // if(data[i].state==0)
        // {
        // 	operation="开仓"
        // }
        // if(data[i].state==1)
        // {	
        // 	operation="增仓"
        // }
        // if(data[i].state==2)
        // {
        // 	operation='减仓'
        // }
        // if(data[i].state=3)
        // {
        // 	operation="平仓"
        // }
        if (data[i].operation === '开仓') {

            // $("#home").append("<p style='font-size:12px;'><span style='font-size:12px;color:#A73CC2;'>【" + from + "】</span>建议，【单号】：" + id + "<span style='font-weight:600;font-size:14px;color:red;'>" + "&nbsp&nbsp" + type + "&nbsp&nbsp" + "</span>" + date + "<br><span style='font-size:14px;font-weight:600;'>" + product + "&nbsp&nbsp" + "</span>" + "【"+name+"】:<span style='font-size:14px;color:red;font-weight:600;'>" + openPrice + "</span>，建议【止盈价】：<span style='font-size:14px;color:red;font-weight:600;'>" + checkUpPrice + "</span>，建议【止损价】：<span style='color:red;font-weight:600;font-size:14px;'>" + checkLowPrice + "</span><br><span style='font-size:6px;color:grey;'>(以上建议仅供参考，投资有风险，操作需谨慎)</span></p>");
            name='开仓价';
            size=12;
            display(size,name);
        }
        if (data[i].operation === '增仓') { //字体不一样 14px
            // $("#home").append("<p style='font-size:12px;'><span style='font-size:"+size+"px;color:#A73CC2;'>【" + from + "】</span>建议，【单号】：" + id + "<span style='font-weight:600;font-size:14px;color:red;'>" + "&nbsp&nbsp" + type + "&nbsp&nbsp" + "</span>" + date + "<br><span style='font-size:14px;font-weight:600;'>" + product + "&nbsp&nbsp" + "</span>" + "【"+name+"】:<span style='font-size:14px;color:red;font-weight:600;'>" + openPrice + "</span>，建议【止盈价】：<span style='font-size:14px;color:red;font-weight:600;'>" + checkUpPrice + "</span>，建议【止损价】：<span style='color:red;font-weight:600;font-size:14px;'>" + checkLowPrice + "</span><br><span style='font-size:6px;color:grey;'>(以上建议仅供参考，投资有风险，操作需谨慎)</span></p>");
            size=14;
            name='增仓价';
            display(size,name);
        }
        if (data[i].operation === '挂单') {
            // $("#home").append("<p style='font-size:12px;'><span style='font-size:12px;color:#A73CC2;'>【" + from + "】</span>建议，【单号】：" + id + "<span style='font-weight:600;font-size:14px;color:red;'>" + "&nbsp&nbsp" + type + "&nbsp&nbsp" + "</span>，" + date + "<br><span style='font-size:14px;font-weight:600;'>" + product + "&nbsp&nbsp" + "</span>" + "【"+name+"】:<span style='font-size:14px;color:red;font-weight:600;'>" + openPrice + "</span>，建议【止盈价】：<span style='font-size:14px;color:red;font-weight:600;'>" + checkUpPrice + "</span>，建议【止损价】：<span style='color:red;font-weight:600;font-size:14px;'>" + checkLowPrice + "</span><br><span style='font-size:6px;color:grey;'>(以上建议仅供参考，投资有风险，操作需谨慎)</span></p>");
            name='开仓价';
            size=12;
            display(size,name);
        }
        if (data[i].operation === '减仓') {
            //$("#home").append("<p style='font-size:14px;'><span style='font-size:14px;color:#A73CC2;'>【" + from + "】</span>建议，【单号】：" + id + "<span style='font-weight:600;font-size:16px;color:red;'>" +"&nbsp&nbsp"+ type +"&nbsp&nbsp"+ "</span>，" + date + "<br><span style='font-size:16px;font-weight:600;'>" + product +"&nbsp&nbsp"+ "</span>" + "【减仓价】:<span style='font-size:16px;color:red;font-weight:600;'>" + openPrice + "</span>，建议【止盈价】：<span style='font-size:16px;color:red;font-weight:600;'>" + checkUpPrice + "</span>，建议【止损价】：<span style='color:red;font-weight:600;font-size:16px;'>" + checkLowPrice + "</span><br><span style='font-size:6px;color:grey;'>(以上建议仅供参考，投资有风险，操作需谨慎)</span></p>");
            $("#home").append("<p style='font-size:12px;'><span style='font-size:12px;color:#A73CC2;'>【" + from + "】</span>建议，【单号】：" + id + "<span style='font-weight:600;font-size:14px;color:red;'>" + "&nbsp&nbsp" + fword + "&nbsp&nbsp" + type_format + "</span>，" + date + "<br><span style='font-size:14px;font-weight:600;'>" + product + "&nbsp&nbsp" + "</span>" + "建议【减仓价】:<span style='font-size:14px;color:red;font-weight:600;'>" + finnishPrice + "</span><br><span style='font-size:6px;color:grey;'>(以上建议仅供参考，投资有风险，操作需谨慎)</span></p>");
            
        }
        if (data[i].operation === '平仓') {
            $("#home").append("<p style='font-size:12px;'><span style='font-size:12px;color:#A73CC2;'>【" + from + "】</span>建议，【单号】：" + id + "<span style='font-weight:600;font-size:14px;color:red;'>" + "&nbsp&nbsp" + word + "&nbsp&nbsp" + type_format + "</span>，" + date + "<br><span style='font-size:14px;font-weight:600;'>" + product + "&nbsp&nbsp" + "</span>" + "建议【平仓价】:<span style='font-size:14px;color:red;font-weight:600;'>" + finnishPrice + "</span><br><span style='font-size:6px;color:grey;'>(以上建议仅供参考，投资有风险，操作需谨慎)</span></p>");
            
        }


        if (data[i].operation === '挂单成交') {
            $("#home").append("<p style='font-size:12px;'><span style='font-size:12px;color:#A73CC2;'>【" + from + "】</span>建议，【单号】：" + id + "<span style='font-weight:600;font-size:14px;color:red;'>&nbsp&nbsp挂单成交</span>，" + date + "<br><span style='font-size:14px;font-weight:600;'>" + product + "&nbsp&nbsp" + "</span>建议" + type + "【开仓价】:<span style='font-size:14px;color:red;font-weight:600;'>" + openPrice + "</span>，建议【止盈价】：<span style='font-size:14px;color:red;font-weight:600;'>" + checkUpPrice + "</span>，建议【止损价】：<span style='color:red;font-weight:600;font-size:14px;'>" + checkLowPrice + "</span><br><span style='font-size:6px;color:grey;'>(以上建议仅供参考，投资有风险，操作需谨慎)</span></p>");
            
        }

        if (data[i].operation === '撤单') {
            $("#home").append("<p style='font-size:12px;'><span style='font-size:12px;color:#A73CC2;'>【" + from + "】</span>建议，【单号】：" + id + "<span style='font-weight:600;font-size:14px;color:red;'></span>，" + date + "<br><span style='font-size:14px;font-weight:600;'>" + product + "&nbsp&nbsp" + "</span>【撤单】：撤单理由" + reason + "<br /><span style='font-size:6px;color:grey;'>(以上建议仅供参考，投资有风险，操作需谨慎)</span></p>");
            
        }
        scroll();
    };
})
function scroll(){
	document.getElementById('home').scrollTop = document.getElementById('home').scrollHeight;
	document.getElementById('resize').scrollTop = document.getElementById('resize').scrollHeight;
}
function display(size,name)
{
 $("#home").append("<p style='font-size:12px;'><span style='font-size:"+size+"px;color:#A73CC2;'>【" + from + "】</span>建议，【单号】：" + id + "<span style='font-weight:600;font-size:14px;color:red;'>" + "&nbsp&nbsp" + type + "&nbsp&nbsp" + "</span>，" + date + "<br><span style='font-size:14px;font-weight:600;'>" + product + "&nbsp&nbsp" + "</span>" + "【"+name+"】:<span style='font-size:14px;color:red;font-weight:600;'>" + openPrice + "</span>，建议【止盈价】：<span style='font-size:14px;color:red;font-weight:600;'>" + upPrice + "</span>，建议【止损价】：<span style='color:red;font-weight:600;font-size:14px;'>" + lowPrice + "</span><br><span style='font-size:6px;color:grey;'>(以上建议仅供参考，投资有风险，操作需谨慎)</span></p>");

}