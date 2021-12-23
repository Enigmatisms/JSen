function pressButton(loop_class){
	loop_class.cnt=0;
}

class Loop {
	constructor() {
		this.cnt = 0;	
	}
	loop_func() {
		document.getElementById("cnt").innerHTML="loop counter: " + this.cnt;
		this.cnt += 1;
	}
}

var can_i_do_this = 0;

function test() {
	can_i_do_this = 1;
	alert(can_i_do_this);
	can_i_do_this += 1;
}

function test2() {
	var str = "test" + "yes";
	console.log(str.charCodeAt());
	console.log(str);
	can_i_do_this += 1;
}

var elem = document.getElementById("id1");
var arr = new Set([13, 32, 27])
elem.onkeyup = function(event) {
	var key_code = event.keyCode;
	console.log(key_code);
	if (arr.has(key_code))
		testType(key_code);
}

function testType(key_code) {
	var s = document.getElementById("id1");
	if (key_code == 27) {
		s.style.border="1px solid red";
		s.style.borderRadius="3px";
	} else {
		s.style.border="1px solid";
		s.style.borderRadius="3px";
	}
	var type = typeof s.value;
	var t2 = typeof s.onkeydown;
	console.log("Type is: " + type + ", type of func:" + t2);
	console.log(s.onkeydown);
	console.log(elem);
}

function changeViz() {
	var elem = document.getElementById("first_img");
	var viz_level = elem.style.display;
	if (viz_level == "none") {
		elem.style.display = "block";
	} else {
		elem.style.display = "none";
	}
}

let lp = new Loop(); 
self.setInterval("lp.loop_func()", 1000);

var first_img = document.getElementById("first_img");
first_img.src = "D:\\Screenshot-2021-12-16.png";