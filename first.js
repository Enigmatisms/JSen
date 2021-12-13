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

let lp = new Loop(); 
self.setInterval("lp.loop_func()", 1000);