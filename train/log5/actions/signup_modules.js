import {User, all_users} from "./common.js"

var box_arr = new Array(
    document.getElementById("username"), // user name input
    document.getElementById("pswd_box"), // password box
    document.getElementById("conf_box")  // password confirmation
);

var tmp_user = new User("", "", 0, 0);

function setErrorBox(elem_id, log_str, box_id) {
    document.getElementById(elem_id).innerHTML=log_str;
    box_arr[box_id].focus();
    box_arr[box_id].style.border="1px solid red";
}

function clearErrorBox(elem_id, box_id) {
    document.getElementById(elem_id).innerHTML="";
    box_arr[box_id].style.border="1px solid";
    if (box_id < 2) {
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
            return;
        }
        if (is_digit == true) {
            continue;
        }
        has_char = true;
    }
    if (has_char == false) {
        setErrorBox("user_end", "Can not compose of digits only", 0);
        return;
    }
    if (name in all_users) {
        setErrorBox("user_end", "Name '" + name + "' is taken", 0);
        return;
    }
    clearErrorBox("user_end", 0);
    tmp_user.user_name = name;
}

function check2Confirm() {
    // password can be any string, length in range[8, 24]
    /* robustness indicator (css should be used): 
        - only digits or eng chars: weak
        - Combined: moderate
        - With captitalized or special chars: strong 
    */
}
