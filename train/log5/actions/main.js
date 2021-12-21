// 为true时，在signin 状态下，按下返回会回到主菜单，主菜单下按下返回键不会有任何反应
var in_signin = false;     

var buttons = document.getElementById("entries");
var all_login_boxes = document.getElementsByName("logins");
var cover_img = document.getElementById("main_cover");
cover_img.src = "../../assets/cover.png";

function signUp() {
    // 网页跳转
    window.location.href = "../first/web.html";
}

function signIn() {
    buttons.style.display = "none";
    console.log(all_login_boxes);
    for (var i = 0; i < all_login_boxes.length; i++) {
        var box = all_login_boxes[i];
        box.style.display = "block";
    }
    in_signin = true;
}

function echo() {
    console.log("Yes!!!!!!!!!!");
}

function goBack(call_back) {
    if (in_signin == true) {
        buttons.style.display = "block";
        for (var i = 0; i < all_login_boxes.length; i++) {
            var box = all_login_boxes[i];
            box.style.display = "none";
        }
        in_signin = false;
    }
    call_back();
}

function outputTime() {
    var date = new Date();
    document.getElementById("time_disp").innerHTML = date;
}

self.setInterval("outputTime()", 1000);
