// 为true时，在signin 状态下，按下返回会回到主菜单，主菜单下按下返回键不会有任何反应
var in_signin = false;     

var buttons = document.getElementById("entries");
var boxes = document.getElementById("logins");
var cover_img = document.getElementById("cover_img");
cover_img.src = "../../assets/cover.png";

function signUp() {
    // 网页跳转
    window.location.href = "../first/web.html";
}

function signIn() {
    buttons.style.display = "none";
    boxes.style.display = "block";
    in_signin = true;
}

function goBack() {
    if (in_signin == true) {
        buttons.style.display = "block";
        boxes.style.display = "none";
        in_signin = false;
    }
}
