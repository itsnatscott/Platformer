(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();
var easter = document.getElementById("easter")

var canvas = document.getElementById("canvas"),
context = canvas.getContext("2d"),
width=1336,
height=900,
player = {
  x: width/2,
  y: 221,
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
var lives = []
Score = function(){
  context.fillStyle = "slateGray";
  context.font = "bold 30px courier"
  context.fillText(points,1120+68,185);
}
Lose = function(){
  context.font = "bold 20px courier"
  context.fillText("GAME OVER",1153+68,221)
}


var boxes = []
var cloudBg = []
var controlBox =[]
var ctrlCounter = 0
var projPic = ["proj_pic0","proj_pic1","proj_pic2","proj_pic3"]
var elevator = []

elevator.push({
  x:80,
  y:700,
  width:60,
  height:10,
  dir: 1
});

// set up slide show control buttons
//right box
controlBox.push({
  x:1140-200+68,
  y:600,
  width:60,
  height:60
});

//left box
controlBox.push({
  x:200+68,
  y:600,
  width:60,
  height:60
});

//life markers

lives.push({
  x:1318,
  y:5,
  width:3,
  height:7
});

lives.push({
  x:1313,
  y:5,
  width:3,
  height:7
});

lives.push({
  x:1308,
  y:5,
  width:3,
  height:7
});

//Bottom floor
boxes.push({
  x:0,
  y: 750,
  width:width,
  height: 30
});
// roof
boxes.push({
  x:590+68,
  y: 225,
  width:600,
  height: 10
});
boxes.push({
  x:90+68,
  y: 225,
  width:400,
  height: 10
});
boxes.push({
  x:-68+68,
  y: 225,
  width:80,
  height: 10
});
boxes.push({
  x:1300,
  y: 225,
  width:36,
  height: 10
});

///obsticle boxes

//N
boxes.push({
  x: 40+68,
  y: 25,
  width: 20,
  height: 180
});

boxes.push({
  x: 60+68,
  y: 45,
  width: 20,
  height: 20
});
boxes.push({
  x: 80+68,
  y: 65,
  width: 20,
  height: 20
});
boxes.push({
  x: 100+68,
  y: 85,
  width: 20,
  height: 20
});
boxes.push({
  x: 120+68,
  y: 105,
  width: 20,
  height: 20
});
boxes.push({
  x: 140+68,
  y: 125,
  width: 20,
  height: 20
});
boxes.push({
  x: 160+68,
  y: 145,
  width: 20,
  height: 20
});

boxes.push({
  x: 180+68,
  y: 25,
  width: 20,
  height: 100
});
boxes.push({
  x: 180+68,
  y: 145,
  width: 20,
  height: 60
});
//A
boxes.push({
  x: 220+68,
  y: 65,
  width: 20,
  height: 140
});
boxes.push({
  x: 240+68,
  y: 105,
  width: 60,
  height: 20
});
boxes.push({
  x: 240+68,
  y: 45,
  width: 20,
  height: 20
});
boxes.push({
  x: 300+68,
  y: 65,
  width: 20,
  height: 60
});
boxes.push({
  x: 300+68,
  y: 145,
  width: 20,
  height: 60
});

boxes.push({
  x: 260+68,
  y: 25,
  width: 20,
  height: 20
});
//T
boxes.push({
  x: 320+68,
  y: 25,
  width: 60,
  height: 20
});
boxes.push({
  x: 400+68,
  y: 25,
  width: 20,
  height: 20
});
boxes.push({
  x: 360+68,
  y: 45,
  width: 20,
  height: 40
});
boxes.push({
  x: 360+68,
  y: 105,
  width: 20,
  height: 100
});
//S
boxes.push({
  x: 480+68,
  y: 45,
  width: 20,
  height: 40
});
boxes.push({
  x: 500+68,
  y: 25,
  width: 80,
  height: 20
});
boxes.push({
  x: 580+68,
  y: 45,
  width: 20,
  height: 20
});
boxes.push({
  x: 520+68,
  y: 105,
  width: 40,
  height: 20
});
boxes.push({
  x: 560+68,
  y: 125,
  width: 20,
  height: 20
});
boxes.push({
  x: 580+68,
  y: 145,
  width: 20,
  height: 40
});
boxes.push({
  x: 500+68,
  y: 185,
  width: 80,
  height: 20
});
boxes.push({
  x: 480+68,
  y: 165,
  width: 20,
  height: 20
});
//C
boxes.push({
  x: 620+68,
  y: 45,
  width: 20,
  height: 80
});
boxes.push({
  x: 620+68,
  y: 145,
  width: 20,
  height: 40
});
boxes.push({
  x: 640+68,
  y: 185,
  width: 60,
  height: 20
});
boxes.push({
  x: 700+68,
  y: 165,
  width: 20,
  height: 20
});
boxes.push({
  x: 640+68,
  y: 25,
  width: 60,
  height: 20
});
boxes.push({
  x: 700+68,
  y: 45,
  width: 20,
  height: 20
});
//O
boxes.push({
  x: 740+68,
  y: 45,
  width: 20,
  height: 60
});
boxes.push({
  x: 740+68,
  y: 125,
  width: 20,
  height: 60
});
boxes.push({
  x: 760+68,
  y: 25,
  width: 40,
  height: 20
});
boxes.push({
  x: 760+68,
  y: 185,
  width: 60,
  height: 20
});
boxes.push({
  x: 820+68,
  y: 45,
  width: 20,
  height: 20
});
boxes.push({
  x: 820+68,
  y: 85,
  width: 20,
  height: 100
});
//T
boxes.push({
  x: 860+68,
  y: 25,
  width: 60,
  height: 20
});
boxes.push({
  x: 940+68,
  y: 25,
  width: 20,
  height: 20
});
boxes.push({
  x: 900+68,
  y: 45,
  width: 20,
  height: 80
});
boxes.push({
  x: 900+68,
  y: 145,
  width: 20,
  height: 60
});
//T
boxes.push({
  x: 980+68,
  y: 25,
  width: 100,
  height: 20
});
boxes.push({
  x: 1060+68,
  y: 25,
  width: 20,
  height: 20
});
boxes.push({
  x: 1020+68,
  y: 45,
  width: 20,
  height: 40
});
boxes.push({
  x: 1020+68,
  y: 105,
  width: 20,
  height: 100
});
//!
boxes.push({
  x:1100+68,
  y:25,
  width:20,
  height:100
})
boxes.push({
  x:1140+68,
  y:25,
  width:20,
  height:100
})
boxes.push({
  x:1100+68,
  y:145,
  width:20,
  height:60
})
boxes.push({
  x:1140+68,
  y:145,
  width:20,
  height:60
})
//point testing ladder
// boxes.push({
//   x:1160,
//   y:180,
//   width:20,
//   height:2
// })
// boxes.push({
//   x:1160,
//   y:100,
//   width:10,
//   height:2
// })

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

//game loop
function update(){

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


      if (player.x >= width-player.width){
        player.x = 0;
      }else if (player.x <= 0){
        player.x = width-player.width;
      }    


      context.clearRect(0,0,width,height);
      context.fillStyle = "slateGray";
      context.beginPath();
      player.grounded = false;

//draw dark gray boxes and attach collision
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
//draw elevator
context.rect(elevator[0].x,elevator[0].y,elevator[0].width,elevator[0].height);
elevator[0].y = elevator[0].y + elevator[0].dir
if(elevator[0].y >= 750){
  elevator[0].dir = -1
}
if(elevator[0].y <= 225){
  elevator[0].dir = 1
}
var dir = colCheck(player, elevator[0]);
   if (dir === "1" || dir === "r"){
    player.velX = 0;
    player.jumping = false;
  }else if (dir === "b"){
    player.grounded = true;
    player.jumping = false;
  } else if (dir === "t") {
    player.velY *= -1;
  };


//draw control boxes

for (var i = 0; i< controlBox.length; i++){
  //set counter for bump animation
  if (controlBox[i].y < 600){ctrlCounter ++};
  if (ctrlCounter === 5){
    controlBox[i].y = 600;
    ctrlCounter = 0;
  };  

  //draw control boxes to canvas
  context.rect(controlBox[i].x,controlBox[i].y,controlBox[i].width,controlBox[i].height);
  var dir = colCheck(player, controlBox[i]);
   if (dir === "1" || dir === "r"){
    player.velX = 0;
    player.jumping = false;
  }else if (dir === "b"){
    player.grounded = true;
    player.jumping = false;
  } else if (dir === "t") {
    controlBox[i].y = controlBox[i].y -3;
    player.velY *= -1;
  };

};
player.x += player.velX;
player.y += player.velY;

context.fill();


//draw cloud
context.fillStyle = "white"
context.fillRect(cloud.x,cloud.y,cloud.width,cloud.height)
var dir = colCheck(player,cloud);
if (dir === "l" || dir === "r"){
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
context.fillRect(180+68, 125, 20, 20);
//A
context.fillRect(300+68, 125, 20, 20);
context.fillRect(280+68, 45, 20, 20);
//T
context.fillRect(380+68, 25, 20, 20);
context.fillRect(360+68, 85, 20, 20);
//S
context.fillRect(500+68, 85, 20, 20);
//C
context.fillRect(620+68, 125, 20, 20);
//O
context.fillRect(800+68, 25, 20, 20);
context.fillRect(740+68, 105, 20, 20);
context.fillRect(820+68, 65, 20, 20);
//T
context.fillRect(900+68, 125, 20, 20);
context.fillRect(920+68, 25, 20, 20);
//T
context.fillRect(1020+68, 85, 20, 20);
//! line
context.fillRect(1120+68,25,20,100);
//! dot
context.fillRect(1120+68,145,20,60);

context.fillStyle = "red";
context.font = "bold 6px courier"
context.fillText("score",1120+69,44);

//draw score line
line = {
  x:1120+68,
  y:45,
  width:20,
  height:1
}
context.fillRect(line.x,line.y,line.width,line.height);
var pt = colCheck(player,line);
if (pt === "b"){
  player.y = player.y+5
  points = points+1
}

// display score
if(points>0){
  Score();
}



// player block
context.fillStyle = "red";
context.fillRect(player.x, player.y, player.width, player.height);
//moving box/player interaction
if(player.x >= cloud.x-15 && player.x <= cloud.x+15 && player.y <= cloud.y && player.y >= cloud.y-14){
  player.x = player.x + 1
};
// display lives
for (i=0; i<lives.length; i++){
  context.fillRect(lives[i].x,lives[i].y,lives[i].width,lives[i].height)
};

// display game over
if(player.y>235){
  lives.pop()
  // if (lives.length >= 1){
  //   player.x = width/2;
  //   player.y = height-18;
  // }else{
  //   context.fillstyle = "Red";
  //   Lose();
  // }
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
  
easter.addEventListener('mouseover', function(){
easter.src = "public/images/facesquare1.gif";
});

  document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
  });

  document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
  });

  window.addEventListener("load",function(){
    update();
  });





  // $('#proj_pic1').toggleClass('hide')