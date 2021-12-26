import { all_users, User } from "./common.js"

const bg_colors = [
    ["#c8c8c8", "#c8c8c8", "#c8c8c8"],      // nothing
    ["#ff0000", "#c8c8c8", "#c8c8c8"],      // low
    ["#f8dc08", "#f8dc08", "#c8c8c8"],      // mid
    ["#1cff1c", "#1cff1c", "#1cff1c"],      // strong
    ["#ff0000", "#ff0000", "#ff0000"]       // err
];
const valid_keys = new Set([13, 27, 32]);      // return, esc, space

var can_make_user = 0x00;

var all_ends = document.getElementsByName("logins");
for (let i = 0; i < all_ends.length; i++) {
    all_ends[i].style.display = "block";
}

var box_arr = new Array(
    document.getElementById("username"), // user name input
    document.getElementById("pswd_box"), // password box
    document.getElementById("conf_box")  // password confirmation
);

var tmp_user = new User("", "", 0);
var tmp_password = "";

function setKeyUpFunction(callBack_fn, box_id, all_pass = false) {
    return function(event) {
        var key_code = event.keyCode;
        if (all_pass || valid_keys.has(key_code)) {
            if (key_code == 27) {
                box_arr[box_id].value = "";
                box_arr[box_id].blur();
            } else {
                callBack_fn();
            }
        } else {
            event.preventDefault();
        }
    } 
}

box_arr[0].onkeyup = setKeyUpFunction(checkUserName, 0);
box_arr[1].onkeyup = setKeyUpFunction(check2Confirm, 1, true);
box_arr[2].onkeyup = setKeyUpFunction(finalConfirm, 2);

function setErrorBox(elem_id, log_str, box_id) {
    document.getElementById(elem_id).innerHTML=log_str;
    box_arr[box_id].focus();
    box_arr[box_id].style.border="1px solid red";
}

function clearErrorBox(elem_id, box_id, no_focus = false) {
    document.getElementById(elem_id).innerHTML="";
    box_arr[box_id].style.border="1px solid";
    if (box_id < 2 && no_focus == false) {
        box_arr[box_id + 1].focus();
    }
}

function checkUserName() {
    var name = box_arr[0].value;
    if (name.length <= 3 || name.length > 32) {
        setErrorBox("user_end", "Length should be in range[4, 32]", 0);
        return;
    }
    var has_char = false;
    for (let i = 0; i < name.length; i++) {
        let ascii = name.charCodeAt(i);
        let is_lower = (ascii >= 97 && ascii < 123);
        let is_upper = (ascii >= 65 && ascii < 91);
        let is_digit = (ascii >= 48 && ascii < 58);
        if (!is_upper && !is_lower && !is_digit) {
            setErrorBox("user_end", "Contains illegal character", 0);
            can_make_user = 0;
            return;
        }
        if (is_digit == true) {
            can_make_user = 0;
            continue;
        }
        has_char = true;
    }
    if (has_char == false) {
        setErrorBox("user_end", "Can not compose of digits only", 0);
        can_make_user = 0;
        return;
    }
    if (name in all_users) {
        setErrorBox("user_end", "Name '" + name + "' is taken", 0);
        can_make_user = 0;
        return;
    }
    clearErrorBox("user_end", 0);
    can_make_user |= 0x01;
    tmp_user.user_name = name;
}

var pswd_box = document.getElementsByClassName("pswd_indicator");
function check2Confirm() {
    var password = box_arr[1].value
    if (password.length < 8 || password.length > 24) {
        setErrorBox("pswd_end", "Password should be in range[8, 24]", 1);
        pswdBoxSetColor(4);
        can_make_user &= 0xfd;      // clear bit pos 2
        return;
    } else {
        clearErrorBox("pswd_end", 1, true);
    }
    var has_digit = 0x00, has_char_low = 0x00, has_char_up = 0x00, has_other = 0x00;
    for (let i = 0; i < password.length; i++) {
        let ascii = password.charCodeAt(i);
        if (ascii >= 97 && ascii < 123) {
            has_char_low = 0x01;
        } else if (ascii >= 65 && ascii < 91) {
            has_char_up = 0x02;
        } else if (ascii >= 48 && ascii < 58) {
            has_digit = 0x01;
        } else {
            has_other = 0x02;
        }
    }
    var mid_cond = has_char_up | has_other;
    var basic = (mid_cond > 0) ? (has_digit | has_char_low) : (has_digit + has_char_low);
    pswdBoxSetColor(basic | mid_cond);
    tmp_password = password;
    can_make_user |= 0x02;
}

function pswdBoxSetColor(id) {
    for (let i = 0; i < 3; i++) {
        pswd_box[i].style.backgroundColor = bg_colors[id][i];
    }
}

function finalConfirm() {
    var password = box_arr[2].value
    if (can_make_user < 0x03) {
        alert("Please fill in the essential information")
        return;
    }
    if (password != tmp_password) {
        setErrorBox("conf_end", "Password inconsistent", 2);
    } else {
        tmp_user.password = password;
        all_users[tmp_user.user_name] = tmp_user;
        alert("Signup sucessful. Welcome to join us: " + tmp_user.user_name);
        window.return2Main();
    }
}

window.onBlurFunc = function(id) {
    if (id == 0) {
        checkUserName();
    } else {
        check2Confirm();
    }
}

window.confirmSignup = finalConfirm;

window.return2Main = function () {
    window.location.href = "./login.html";
}
