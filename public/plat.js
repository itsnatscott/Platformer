(function() {
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();


function update(){
	if (keys[38] || keys[32]){
		//up arrow or space
		if(!player.jumping){
			player.jumping=true;
			player.velY = -player.speed*2;
		}
	}
	if (keys[39]){
		//right arrow
		if (player.velX < player.speed){
			player.velX++;
		}
	}

	if (keys[37]){
		//left arrow
		if (player.velX > -player.speed){
			player.velX--;
		}
	}
	player.velX *= friction;
	player.velY += gravity
	player.x += player.velX;
	player.y += player.velY;

	if (player.x >= width-player.width){
		player.x = 0;
	}else if (player.x <= 0){
		player.x = width-player.width;
	}

	if(player.y >= height-player.height) {
		player.y = height - player.height;
		player.jumping = false;
	}
	
	ctx.clearRect(0,0,width,height);
	ctx.fillstyle ="red";
	ctx.fillRect(player.x,player.y, player.width,player.height);
	requestAnimationFrame(update);
}
var boxes = []

boxes.push({
	x: 0,
	y:0,
	width: 10,
	height:height
});

boxes.push({
	x:0,
	y: height -2,
	width:width,
	height: 50
});
boxes.push({
	x: width-10,
	y:0,
	width:50,
	height:height
});

var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
width=800,
height=200,
player = {
	x: width/2,
	y: height - 14,
	width:9,
	height:14,
	speed:3,
	velX:0,
	velY:0,
	jumping: false
};
keys = [];
document.body.addEventListener("keydown",function(e){
	keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e){
	keys[e.keyCode]=false;
});

friction = 0.8;
gravity = 0.25;

canvas.width = width;
canvas.height = height;

ctx.fillStyle = "red";
ctx.fillRect (player.x, player.y, player.width, player.height);





















window.addEventListener("load", function(){
	update();
});