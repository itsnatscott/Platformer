(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
width=800,
height=250,
player = {
  x: width/2,
  y: height - 14,
  width:9,
  height:14,
  speed:3,
  velX:0,
  velY:0,
  jumping: false,
  grounded: false,
  sliding:false
};
keys = [],
friction = 0.8,
gravity = 0.2;

canvas.width = width;
canvas.height = height;

var boxes = []
//floor
boxes.push({
  x:0,
  y: height -10,
  width:width,
  height: 50
});
//bottom right
boxes.push({
  x: width-10,
  y:120,
  width:50,
  height:120
});
//top right
boxes.push({
  x: width-10,
  y:-90,
  width:10,
  height:150
});
//bottom left
boxes.push({
  x: 0,
  y:120,
  width: 10,
  height:height-60
});
//top left
boxes.push({
  x:0,
  y:0,
  width:10,
  height:90
});

///obsticle boxes
boxes.push({
    x: 10,
    y: 30,
    width: 40,
    height: 10
});

boxes.push({
    x: 170,
    y: 90,
    width: 80,
    height: 30
});
boxes.push({
    x: 320,
    y: 100,
    width: 80,
    height: 80
});
boxes.push({
    x: 470,
    y: 160,
    width: 40,
    height: 40
});
boxes.push({
    x: 570,
    y: 80,
    width: 80,
    height: 50
});
boxes.push({
    x: 670,
    y: 180,
    width: 40,
    height: 40
});

boxes.push({
    x: 770,
    y: 60,
    width: 40,
    height: 20
});


function update(){
  // check keys
  if (keys[38] || keys[32]) {
        // up arrow or space
        if(!player.jumping && player.grounded){
         player.jumping = true;
         player.grounded = false;
         player.velY = -player.speed*2;
       }
     }
     if (keys[39]) {
        // right arrow
        if (player.velX < player.speed) {             
          player.velX++;         
        }     
      }     
      if (keys[37]) {         
        // left arrow         
        if (player.velX > -player.speed) {
          player.velX--;
        }
      }

      player.velX *= friction;

      player.velY += gravity;

      // player.x += player.velX;
      // player.y += player.velY;

      if (player.x >= width-player.width){
        player.x = 0;
      }else if (player.x <= 0){
        player.x = width-player.width;
      }    

      // if(player.y >= height-player.height-10){
      //   player.y = height - player.height-10;
      //   player.jumping = false;
      // }

      ctx.clearRect(0,0,width,height);
      ctx.fillStyle = "black";
      ctx.beginPath();
      player.grounded = false;
      for (var i = 0; i < boxes.length; i++) {
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
        var dir = colCheck(player, boxes[i]);
        if (dir === "1" || dir === "r"){
          player.velX = 0;
          player.jumping = false;
        }else if (dir === "b"){
          player.grounded = true;
          player.jumping = false;
        } else if (dir === "t") {
          player.velY *= -1;
        }
      }

      if(player.grounded){
        player.velY = 0;
      }
      player.x += player.velX;
      player.y += player.velY;

      ctx.fill();
      ctx.fillStyle = "red";
      ctx.fillRect(player.x, player.y, player.width, player.height);

      requestAnimationFrame(update);
    }

    function colCheck(shapeA, shapeB) {
      var vX = (shapeA.x + (shapeA.width/2)) - (shapeB.x + (shapeB.width/2)),
      vY =(shapeA.y + (shapeA.height/2))-(shapeB.y + (shapeB.height/2)),
      hWidths = (shapeA.width/2) + (shapeB.width/2), 
      hHeights = (shapeA.height/2) + (shapeB.height/2),
      colDir = null;

      if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         // figures out on which side we are colliding (top, bottom, left, or right)         
        var oX = hWidths - Math.abs(vX),             
        oY = hHeights - Math.abs(vY);         
        if (oX >= oY) {
          if (vY > 0) {
            colDir = "t";
            shapeA.y += oY;
          } else {
            colDir = "b";
            shapeA.y -= oY;
          }
        } else {
          if (vX > 0) {
            colDir = "l";
            shapeA.x += oX;
          } else {
            colDir = "r";
            shapeA.x -= oX;
          }
        }
      }
      return colDir;

    }

    document.body.addEventListener("keydown", function(e) {
      keys[e.keyCode] = true;
    });

    document.body.addEventListener("keyup", function(e) {
      keys[e.keyCode] = false;
    });

    window.addEventListener("load",function(){
      update();
    });