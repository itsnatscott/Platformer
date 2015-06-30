(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
context = canvas.getContext("2d"),
width=1200,
height=235,
player = {
  x: width/2,
  y: height - 14,
  width:6,
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
// write on canvas
var points = 0
Score = function(){
  context.fillStyle = "red";
  context.font = "bold 30px courier"
  context.fillText(points,1100,185);
}

var boxes = []
var cloudBg = []


//floor
boxes.push({
  x:0,
  y: height -10,
  width:width,
  height: 10
});
//bottom right
boxes.push({
  x: width-10,
  y:120,
  width:50,
  height:120
});
//top right
// boxes.push({
//   x: width-10,
//   y:-90,
//   width:10,
//   height:150
// });
//bottom left
boxes.push({
  x: 0,
  y:120,
  width: 10,
  height:height-60
});
//top left
// boxes.push({
//   x:0,
//   y:0,
//   width:10,
//   height:90
// });

///obsticle boxes

//N
boxes.push({
  x: 40,
  y: 25,
  width: 20,
  height: 180
});

boxes.push({
  x: 60,
  y: 45,
  width: 20,
  height: 20
});
boxes.push({
  x: 80,
  y: 65,
  width: 20,
  height: 20
});
boxes.push({
  x: 100,
  y: 85,
  width: 20,
  height: 20
});
boxes.push({
  x: 120,
  y: 105,
  width: 20,
  height: 20
});
boxes.push({
  x: 140,
  y: 125,
  width: 20,
  height: 20
});

boxes.push({
  x: 180,
  y: 25,
  width: 20,
  height: 180
});
//A
boxes.push({
  x: 220,
  y: 65,
  width: 20,
  height: 140
});
boxes.push({
  x: 240,
  y: 105,
  width: 60,
  height: 20
});
boxes.push({
  x: 240,
  y: 45,
  width: 20,
  height: 20
});
boxes.push({
  x: 300,
  y: 65,
  width: 20,
  height: 60
});
boxes.push({
  x: 300,
  y: 145,
  width: 20,
  height: 60
});

boxes.push({
  x: 260,
  y: 25,
  width: 20,
  height: 20
});
//T
boxes.push({
  x: 320,
  y: 25,
  width: 60,
  height: 20
});
boxes.push({
  x: 400,
  y: 25,
  width: 20,
  height: 20
});
boxes.push({
  x: 360,
  y: 45,
  width: 20,
  height: 40
});
boxes.push({
  x: 360,
  y: 105,
  width: 20,
  height: 100
});
//S
boxes.push({
  x: 460,
  y: 45,
  width: 20,
  height: 40
});
boxes.push({
  x: 480,
  y: 25,
  width: 80,
  height: 20
});
boxes.push({
  x: 560,
  y: 45,
  width: 20,
  height: 20
});
boxes.push({
  x: 500,
  y: 105,
  width: 40,
  height: 20
});
boxes.push({
  x: 540,
  y: 125,
  width: 20,
  height: 20
});
boxes.push({
  x: 560,
  y: 145,
  width: 20,
  height: 40
});
boxes.push({
  x: 480,
  y: 185,
  width: 80,
  height: 20
});
boxes.push({
  x: 460,
  y: 165,
  width: 20,
  height: 20
});
//C
boxes.push({
  x: 600,
  y: 45,
  width: 20,
  height: 80
});
boxes.push({
  x: 600,
  y: 145,
  width: 20,
  height: 40
});
boxes.push({
  x: 620,
  y: 185,
  width: 60,
  height: 20
});
boxes.push({
  x: 680,
  y: 165,
  width: 20,
  height: 20
});
boxes.push({
  x: 620,
  y: 25,
  width: 60,
  height: 20
});
boxes.push({
  x: 680,
  y: 45,
  width: 20,
  height: 20
});
//O
boxes.push({
  x: 720,
  y: 45,
  width: 20,
  height: 60
});
boxes.push({
  x: 720,
  y: 125,
  width: 20,
  height: 60
});
boxes.push({
  x: 740,
  y: 25,
  width: 40,
  height: 20
});
boxes.push({
  x: 740,
  y: 185,
  width: 60,
  height: 20
});
boxes.push({
  x: 800,
  y: 45,
  width: 20,
  height: 20
});
boxes.push({
  x: 800,
  y: 85,
  width: 20,
  height: 100
});
//T
boxes.push({
  x: 840,
  y: 25,
  width: 60,
  height: 20
});
boxes.push({
  x: 920,
  y: 25,
  width: 20,
  height: 20
});
boxes.push({
  x: 880,
  y: 45,
  width: 20,
  height: 80
});
boxes.push({
  x: 880,
  y: 145,
  width: 20,
  height: 60
});
//T
boxes.push({
  x: 960,
  y: 25,
  width: 100,
  height: 20
});
boxes.push({
  x: 1040,
  y: 25,
  width: 20,
  height: 20
});
boxes.push({
  x: 1000,
  y: 45,
  width: 20,
  height: 40
});
boxes.push({
  x: 1000,
  y: 105,
  width: 20,
  height: 100
});
//!
boxes.push({
  x:1080,
  y:25,
  width:20,
  height:100
})
boxes.push({
  x:1120,
  y:25,
  width:20,
  height:100
})
//point testing ladder
boxes.push({
  x:1140,
  y:180,
  width:20,
  height:2
})

//cloud
cloud = {
  x:0,
  y:19,
  width:30,
  height:3
}
//cloud bg

cloudBg.push({
  x:2,
  orgX:2,
  y:16,
  width:26,
  height:3
});
cloudBg.push({
  x:4,
  orgX:4,
  y:13,
  width:20,
  height:3
});
cloudBg.push({
  x:5,
  orgX:5,
  y:10,
  width:3,
  height:3
});
cloudBg.push({
  x:19,
  orgX:19,
  y:11,
  width:2,
  height:2
});



function update(){
  //score a point

  //moving cloud platform & cloudBg
  if (cloud.x < width){
    cloud.x = cloud.x+1;
    for(i=0; i<cloudBg.length; i++){
      cloudBg[i].x = cloudBg[i].x +1
    }
  }else{cloud.x = 0;
    for(i=0; i<cloudBg.length; i++){
      cloudBg[i].x = cloudBg[i].orgX
    }
  };



  context.fillStyle = "black";
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

      context.clearRect(0,0,width,height);
      context.fillStyle = "slateGray";
      context.beginPath();
      player.grounded = false;

//draw black boxes and attach collision
for (var i = 0; i < boxes.length; i++) {
  context.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
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
player.x += player.velX;
player.y += player.velY;

context.fill();
//draw cloud
context.fillStyle = "white"
context.fillRect(cloud.x,cloud.y,cloud.width,cloud.height)
var dir = colCheck(player,cloud);
if (dir === "1" || dir === "r"){
  player.velX = 0;
  player.jumping = false;
}else if (dir === "b"){
  player.grounded = true;
  player.jumping = false;
} else if (dir === "t") {
  player.velY *= -1;
};
if(player.grounded){
  player.velY = 0;
}

//draw cloud bg
for (i=0; i<cloudBg.length; i++){
  context.fillRect(cloudBg[i].x,cloudBg[i].y,cloudBg[i].width,cloudBg[i].height)
};

//no collide blocks      
context.fillStyle = "DarkGray";
//N
context.fillRect(160, 145, 20, 20);
//A
context.fillRect(300, 125, 20, 20);
context.fillRect(280, 45, 20, 20);
//T
context.fillRect(380, 25, 20, 20);
context.fillRect(360, 85, 20, 20);
//S
context.fillRect(480, 85, 20, 20);
//C
context.fillRect(600, 125, 20, 20);
//O
context.fillRect(780, 25, 20, 20);
context.fillRect(720, 105, 20, 20);
context.fillRect(800, 65, 20, 20);
//T
context.fillRect(880, 125, 20, 20);
context.fillRect(900, 25, 20, 20);
//T
context.fillRect(1000, 85, 20, 20);
//! line
context.fillRect(1100,25,20,100);
//! dot
context.fillRect(1080,145,60,60);

//draw score line
context.fillStyle = "gray";
line = context.fillRect(1100,45,20,1);




// player block
Score();
context.fillStyle = "red";
context.fillRect(player.x, player.y, player.width, player.height);
//moving box/player interaction
if(player.x >= cloud.x-15 && player.x <= cloud.x+15 && player.y <= cloud.y+18){
  player.x = player.x + 1
};




requestAnimationFrame(update);
}

function colCheck(shapeA, shapeB) {
  var vX = (shapeA.x + (shapeA.width/2)) - (shapeB.x + (shapeB.width/2)),
  vY =(shapeA.y + (shapeA.height/2))-(shapeB.y + (shapeB.height/2)),
  hWidths = (shapeA.width/2) + (shapeB.width/2), 
  hHeights = (shapeA.height/2) + (shapeB.height/2),
  colDir = null;

  if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         
      // figures out on which side we are colliding (top, bottom, left, or right)         
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
          shapeA.x += oX+.5;
        } else {
          colDir = "r";
          shapeA.x -= oX+.5;
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