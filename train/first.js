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

function test() {
	can_i_do_this = 1
	alert(can_i_do_this)
	can_i_do_this += 1
}

function test2() {
	alert(can_i_do_this)
	can_i_do_this += 1
}

var elem = document.getElementById("id1");
var arr = new Set([13, 32, 27])
elem.onkeyup = function(event) {
	var key_code = event.keyCode
	console.log(key_code)
	if (arr.has(key_code))
		testType();
}

function testType() {
	var s = document.getElementById("id1")
	var type = typeof s.value;
	var t2 = typeof s.onkeydown
	console.log("Type is: " + type + ", type of func:" + t2)
	console.log(s.onkeydown)
	console.log(elem)
}

let lp = new Loop(); 
self.setInterval("lp.loop_func()", 1000);