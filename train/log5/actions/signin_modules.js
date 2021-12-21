
var wrong_counter = 0;
var username_box = document.getElementById("username");
var password_box = document.getElementById("password");

class User {
    // 此处的password可以是加密算法加密之后的密文，比如js的内置哈希函数
    constructor(user_name, password, times = 0) {
        this.user_name = user_name;
        this.password = password;
        this.log_time = times;
    }

    getUserName() {
        return this.user_name;
    }

    setUserName(new_name) {
        this.user_name = new_name;
    }

    timeIncrement() {
        this.log_time += 1;
    }
};

var all_users = {
    "Dummy1":new User("Dummy1", "asdfghjkl", 0),
    "Enigmatisms":new User("Enigmatisms", "qwerty", 0),
    "Sentinel":new User("Sentinel", "1234567asd", 0),
    "Raven":new User("Raven", "1212422", 0)
};

var valid_keys = new Set([13, 27, 32]);      // return, esc, space
username_box.onkeyup = function(event) {
    var key_code = event.keyCode;
    if (valid_keys.has(key_code)) {
        processUserName(key_code);
    } else {
        event.preventDefault();
    }
} 

password_box.onkeyup = function(event) {
    var key_code = event.keyCode;
    if (valid_keys.has(key_code)) {
        if (key_code == 27) {
            password_box.value = "";
            console.log("password cleared");
            password_box.blur();
        } else {
            userCheck();
        }
    } else {
        event.preventDefault();
    }
} 

// 在按下回车、空格之后跳转到密码输入，按下esc后清除输入
function processUserName(key_code) {
    if (key_code == 13 || key_code == 32) {
        if (username_box.value.length == 0) {
            document.getElementById("user_end").innerHTML="User name can't be empty";
            username_box.focus();
            username_box.style.border="1px solid red";
        } else {
            document.getElementById("user_end").innerHTML="";
            username_box.style.border="1px solid";
            password_box.focus();
        }
        username_box.style.borderRadius="2px";
    } else {
        username_box.value = "";
        username_box.blur();
        // 清除
    }
}

function userCheck() {
    var uname = username_box.value;
    var pswd = password_box.value;
    if (wrong_counter < 3) {
        if (uname in all_users) {
            console.log("Uname " + uname + " is in the user list.");
            var user = all_users[uname];
            if (user.password == pswd) {
                alert("Login successful, welcome " + user.user_name);
                return;
            } else {
                wrong_counter ++;
            }
        } else {
            console.log("No user called: " + uname)
        }
        alert("Login failed, either user does not exist or password is wrong.");
    } else {
        alert("Too many wrong attempts. Rejecting further requests.")
        username_box.value="";
        password_box.value="";
    }
}

function clearBoxes() {
    username_box.value="";
    password_box.value="";
    document.getElementById("user_end").innerHTML="";
    username_box.style.border="1px solid";
    password_box.blur();
    username_box.blur();
}