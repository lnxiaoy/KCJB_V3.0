function checkName(name, div) {
    var inputName = name.value;
    if (inputName == "") {
        div.innerHTML = null;
        div.innerHTML = "<small>用户名不能为空</small>";
        return false;
    }
    //检测是否出现非数字或者非字母
    for (var i = 0; i < inputName.length; i++) {
        var text = inputName.charAt(i);
        console.log(inputName);
        console.log(inputName.length);
        console.log(i);
        console.log(text);
        if (!(text <= 9 && text >= 0) && !(text >= 'a' && text <= 'z') && !(text >= 'A' && text <= 'Z')) //如果既不是是数字又不是字母
        {
            console.log(text);
            div.innerHTML = null;
            div.innerHTML = "<small>用户名只能由数字、字母组成</small>";
            return false;
            break; //一旦检测到非字母数字就停止检测,跳出去了，但是整个循环体怎么执行了inputName.length遍？
        }
    }
    //检测长度是否符合
    if (inputName.length < 3 || inputName.length > 20) {
        div.innerHTML = null;
        div.innerHTML = "<small>用户名的长度在3到20之间</small>";
        return false;
    }
//检测都通过了
    if (i >= inputName.length) {
        console.log("i=" + i);
        div.innerHTML = null;
        return true;
    }

}

function checkPass(password, show) {
    var inputPass = password.value;
    if (inputPass == "") {
        show.innerHTML = null;
        show.innerHTML = "<small>密码不能为空</small>";
        return false;
    }
    if (inputPass.length < 6 || inputPass.length > 20) {
        show.innerHTML = "<small>输入密码长度不符合</small>";
        return false;
    } else {
        return true;
    }
}
