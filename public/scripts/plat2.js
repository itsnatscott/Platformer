(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();
var easter = document.getElementById("easter")
var img=document.getElementById("skin1");
var canvas = document.getElementById("canvas"),
context = canvas.getContext("2d"),
width=1336,
height=900,
player = {
  x: 1320,
  y: 221,
  width:7,
  height:15,
  speed:3,
  velX:0,
  velY:0,
  jumping: false,
  grounded: false,
  sliding:false,
  skin:img,
  dead:0
};
keys = [],
friction = 0.8,
gravity = 0.15;

canvas.width = width;
canvas.height = height;
var Jump = function(){
  if(!player.jumping && player.grounded){
   player.jumping = true;
   player.grounded = false;
   player.velY = -player.speed*1.5;
   player.velX *= friction;
   player.x += player.velX;
   player.y += player.velY;
 }
}
var extlink = ""
var points = 0
var lives = []
var game = {
  mode:"hard"
}
Reset = function(){
  player.x = 1320;
  player.y = 221;
}
Score = function(){
  context.fillStyle = "slateGray";
  context.font = "bold 30px courier"
  context.fillText(points,1120+68,185);
}
Lose = function(){
  context.font = "bold 20px courier"
  context.fillText("GAME OVER",1153+68,221)
}
Die = function(){
  player.dead++
  context.fillStyle = "Red";
  context.font = "bold 20px courier"
  context.fillText("you died",1153+68,221)
}

OpenLink = function(){
  setTimeout(function(){
   window.open(extLink)
 },300);

}

MouseFollow = function(){
  if (game.mode === "hard"){
  }else{ $(document).mousemove(function (e) {
     var xOffset = e.pageX;
     var yOffset = e.pageY;
     player.x = xOffset-100
     $('body').click(function(){
      Jump()
    });
   });}
}

//obsticle boxes
var boxes = []
//background of cloud
var cloudBg = []
//slideshow control button array
var controlBox =[]
var ctrlCounter = 0


//array for pictures in slideshow

var projPic = [
{src:"public/images/carousel/projects/ricks.jpg",
lnk:"http://45.55.154.205:3002/",
name:"Rick's"},
{src:"public/images/carousel/projects/painter.jpg",
lnk: "http://45.55.154.205:3000/",
name:"Painter"},
{src:"public/images/carousel/projects/refrigerator.jpg",
lnk:"http://45.55.155.149:8080" ,
name:"re:Fridge"},
{src:"public/images/carousel/projects/designist.jpg",
lnk: "http://45.55.154.205:3001/designistforum/",
name:"Designist"}
];

var adPic = [
{src:"public/images/carousel/ads/punch.jpg",
lnk:"http://itsnatscott.com/public/images/punch.jpg",
name:"punch"},
{src:"public/images/carousel/ads/ramen.jpg",
lnk:"http://itsnatscott.com/public/images/ramen.jpg",
name:"ramen"},
{src:"public/images/carousel/ads/lucha.gif",
lnk:"http://itsnatscott.com/public/images/lucha.gif",
name:"lucha"},
{src:"public/images/carousel/ads/diamond.jpg",
lnk:"http://itsnatscott.com/public/images/diamond.jpg",
name:"diamond"},
{src:"public/images/carousel/ads/chinatown.jpg",
lnk:"http://itsnatscott.com/public/images/chinatown.jpg",
name:"chinatown"},
{src:"public/images/carousel/ads/99.jpg",
lnk:"http://itsnatscott.com/public/images/99.jpg",
name:"99"},
{src:"public/images/carousel/ads/web.gif",
lnk:"http://itsnatscott.com/public/images/web.gif",
name:"web awards"},


]

var artPic = [
{src:"public/images/carousel/art/doodle.jpg",
lnk:"http://itsnatscott.com/public/images/doodle.jpg",
name:"doodle"},
{src:"public/images/carousel/art/dragon.jpg",
lnk: "http://itsnatscott.com/public/images/dragon.jpg",
name:"dragon"},
{src:"public/images/carousel/art/supply.jpg",
lnk:"http://itsnatscott.com/public/images/supply.jpg" ,
name:"supply"},
{src:"public/images/carousel/art/choice.jpg",
lnk:"http://itsnatscott.com/public/images/cshigh.jpg" ,
name:"sweets"},
{src:"public/images/carousel/art/lab.jpg",
lnk:"http://itsnatscott.com/public/images/lab.jpg" ,
name:"lab"},
{src:"public/images/carousel/art/duck.jpg",
lnk:"http://itsnatscott.com/public/images/duck.jpg" ,
name:"duck"},
{src:"public/images/carousel/art/meal.jpg",
lnk:"http://itsnatscott.com/public/images/meal.jpg" ,
name:"meal"},
{src:"public/images/carousel/art/train.gif",
lnk:"http://itsnatscott.com/public/images/train.gif" ,
name:"train"},
{src:"public/images/carousel/art/sadfishat.jpg",
lnk:"http://itsnatscott.com/public/images/sadfishat.jpg" ,
name:"sadfishat"}
];

var random = [
{src:"public/images/carousel/random/random.gif",
lnk:"http://www.google.com",
name:"Google"},
{src:"public/images/carousel/random/random.gif",
lnk:"http://www.google.com",
name:"Google"},
{src:"public/images/carousel/random/random.gif",
lnk:"http://www.google.com",
name:"Google"}
]
var picRay = random
var slidePic = 0
var picCounter = 1


//elevator box array
var elevator = []

elevator.push({
  x:85,
  y:235,
  width:68,
  height:15,
  dir: -2,
  yStart:235,
  yEnd:750
});

elevator.push({
  x:1265,
  y:355,
  width:28,
  height:15,
  dir: -2,
  yStart:355,
  yEnd:750
});


// set up slide show control buttons
//forward box
controlBox.push({
  x:1008,
  y:600,
  org:600,
  width:60,
  height:60,
  color:"slateGray",
  color2:"slateGray",
  colorO:"slateGray",
  name:">",
  xName:1033,
  yName:635,
  yNameOrg:635,
  font:"bold 20px courier"
});

//back box
controlBox.push({
  x:248,
  y:600,
  org:600,
  width:60,
  height:60,
  color:"slateGray",
  color2:"slateGray",
  colorO:"slateGray",
  active:false,
  name:"<",
  xName:270,
  yName:635,
  yNameOrg:635,
  font:"bold 20px courier"
});
//slideshow box 1
controlBox.push({
  x:688,
  y: 265,
  org:265,
  width:150,
  height: 30,
  color:"slateGray",
  color2:"white",
  colorO:"slateGray",
  active:false,
  name:"Web",
  xName:742,
  yName:285,
  yNameOrg:285,
  font:"bold 20px courier"
});

//slideshow box 2
controlBox.push({
  x:888,
  y: 265,
  org:265,
  width:150,
  height: 30,
  color:"slateGray",
  color2:"white",
  colorO:"slateGray",
  active:false,
  name:"Art",
  xName:944,
  yName:285,
  yNameOrg:285,
  font:"bold 20px courier"
});

//slideshow box 3
controlBox.push({
  x:1088,
  y: 265,
  org:265,
  width:150,
  height: 30,
  color:"slateGray",
  color2:"white",
  colorO:"slateGray",
  active:false,
  name:"Ads",
  xName:1143,
  yName:285,
  yNameOrg:285,
  font:"bold 20px courier"
});

//external link box
controlBox.push({
  x:188,
  y: 255,
  org:255,
  width:100,
  height: 20,
  type: "link",
  color:"slateGray",
  color2:"slateGray",
  colorO:"slateGray",
  active:false,
  name:"linkedIn",
  xName:200,
  yName:269,
  yNameOrg:269,
  font:"bold 16px courier",
  url: "http://www.linkedin.com/in/brewsterscott"
});

controlBox.push({
  x:308,
  y: 255,
  org:255,
  width:100,
  height: 20,
  type: "link",
  color:"slateGray",
  color2:"slateGray",
  colorO:"slateGray",
  active:false,
  name:"gitHub",
  xName:329,
  yName:269,
  yNameOrg:269,
  font:"bold 16px courier",
  url: "http://www.github.com/itsnatscott?tab=repositories"
});

///slideShow linkbox
controlBox.push({
  x:1020+68,
  y: 385,
  org:255,
  width:150,
  height: 60,
  type: "link",
  color:"slateGray",
  color2:"slateGray",
  colorO:"slateGray",
  active:false,
  name:"",
  xName:329,
  yName:269,
  yNameOrg:269,
  font:"bold 16px courier",
  url: ""
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

//Bottom floor///////////////////////////////
boxes.push({
  x:0,
  y: 750,
  width:width,
  height: 50
});
// second floor//////////////////////////////
boxes.push({
  x:590+68,
  y: 355,
  width:600,
  height: 10
});
boxes.push({
  x:90+68,
  y: 355,
  width:500,
  height: 10
});
boxes.push({
  x:-68+68,
  y: 355,
  width:80,
  height: 10
});
boxes.push({
  x:1300,
  y: 355,
  width:36,
  height: 10
});

//link box sign posts
boxes.push({
  x:1040+68,
  y: 365,
  width:10,
  height: 20
});
boxes.push({
  x:1140+68,
  y: 365,
  width:10,
  height: 20
});

//slide show link box


// rooftop////////////////////////////////
boxes.push({
  x:590+68,
  y: 235,
  width:600,
  height: 10
});
boxes.push({
  x:90+68,
  y: 235,
  width:400,
  height: 10
});
boxes.push({
  x:-68+68,
  y: 235,
  width:80,
  height: 10
});
boxes.push({
  x:1300,
  y: 235,
  width:36,
  height: 10
});
// external link sign posts
boxes.push({
  x:235,
  y: 245,
  width:5,
  height: 20
});

boxes.push({
  x:355,
  y: 245,
  width:5,
  height: 20
});
//slideshow sign posts 3
boxes.push({
  x:1040+68,
  y: 245,
  width:10,
  height: 20
});
boxes.push({
  x:1140+68,
  y: 245,
  width:10,
  height: 20
});

//slideshow sign posts 2
boxes.push({
  x:840+68,
  y: 245,
  width:10,
  height: 20
});
boxes.push({
  x:940+68,
  y: 245,
  width:10,
  height: 20
});

//slideshow sign posts 1
boxes.push({
  x:740+68,
  y: 245,
  width:10,
  height: 20
});
boxes.push({
  x:640+68,
  y: 245,
  width:10,
  height: 20
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

//////////////////////////////////////////////////////////
//game loop
function update(){
  if(game.mode === "easy"){
    MouseFollow();
  };

//run instructions function
if (player.x===1320 && player.y===221){
  $("#bubble").attr("src", "public/images/bubble.gif")
}
  //pause after dying


  if(player.dead>=90){
    player.dead=0
  }

  if(player.dead > 0){
    player.dead++
  }

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
         player.velX *= friction;
         console.log("key38")
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

      if (keys[40]) {         
        // down arrow         
        if(player.jumping && !player.grounded){
         player.jumping = false;
         player.grounded = true;
         player.velY = +player.speed*1;
       }
     };


     player.velX *= friction;

     player.velY += gravity;


     if (player.x >= width-player.width){
      player.x = 0;
    }else if (player.x <= 0){
      player.x = width-player.width;
    }    


    context.clearRect(0,0,width,height);
    context.fillStyle = "slateGray";
    // context.beginPath();
    player.grounded = false;

//draw dark gray boxes and attach collision
for (var i = 0; i < boxes.length; i++) {
  context.fillStyle = "slateGray";
  context.fillRect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
  var dir = colCheck(player, boxes[i]);
  if (dir === "l" || dir === "r"){
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
for (i=0; i<elevator.length; i++)
  {context.fillRect(elevator[i].x,elevator[i].y,elevator[i].width,elevator[i].height);
    elevator[i].y = elevator[i].y + elevator[i].dir
    if(elevator[i].y >= elevator[i].yEnd){
      elevator[i].dir = -2
    }
    if(elevator[i].y <= elevator[i].yStart){
      elevator[i].dir = 2
    }
    var dir = colCheck(player, elevator[i]);
    if (dir === "l" || dir === "r"){
      player.velX = 0;
      player.jumping = false;
    }else if (dir === "b"){
      player.grounded = true;
      player.jumping = false;
    } 
    else if (dir === "t" && player.y <= 738) {
      player.velY *= -2;
    } 
    else if (dir === "t" && player.y === 742) {
      elevator[i].dir = -2;
      player.x = 1320;
      player.y = 221;
      player.dead++
      lives.pop()
    };
  };


//draw control boxes

for (var i = 0; i< controlBox.length; i++){
  //set counter for bump animation
  if (controlBox[i].y < controlBox[i].org){ctrlCounter ++};
  if (ctrlCounter === 5){
    controlBox[i].y = controlBox[i].org;
    controlBox[i].yName = controlBox[i].yNameOrg;
    controlBox[i].color = controlBox[i].colorO;
    ctrlCounter = 0;
  };  

  //draw control boxes to canvas and attach collision
  if (controlBox[i].active === false){
    context.fillStyle = controlBox[i].color
  }else{
    context.fillStyle = controlBox[i].color2
  }
  context.fillRect(controlBox[i].x,controlBox[i].y,controlBox[i].width,controlBox[i].height);
  context.fillStyle = "DarkGray";
  context.font = controlBox[i].font;
  context.fillText(controlBox[i].name,controlBox[i].xName,controlBox[i].yName);
  var dir = colCheck(player, controlBox[i]);
  if (dir === "l" || dir === "r"){
    player.velX = 0;
    player.jumping = false;
  }else if (dir === "b"){
    player.grounded = true;
    player.jumping = false;
  } else if (dir === "t" && player.jumping === true) {
    controlBox[i].y = controlBox[i].y -3;
    controlBox[i].yName = controlBox[i].yName -3;
    controlBox[i].color = "LightSlateGray";
    player.velY *= -1;

    //open link
    if(controlBox[i].type === "link"){
      player.jumping=false;
      extLink = (controlBox[i].url)
      OpenLink()

    }

    //pick a slide show
    if(controlBox[i].name === "Web"){
      $("#pic").attr("src", "public/images/carousel/random/random2.gif");
      controlBox[i].active = true
      controlBox[3].active = false
      controlBox[4].active = false
      picCounter = 1;
      picRay = projPic;
    }

    if(controlBox[i].name === "Art"){
      $("#pic").attr("src", "public/images/carousel/random/random2.gif");
      controlBox[i].active = true
      controlBox[2].active = false
      controlBox[4].active = false
      picCounter = 1;
      picRay = artPic;
    }

    if(controlBox[i].name === "Ads"){
      $("#pic").attr("src", "public/images/carousel/random/random2.gif");
      controlBox[i].active = true
      controlBox[2].active = false
      controlBox[3].active = false
      picCounter = 1;
      picRay = adPic;
    }

    

    //fwd scroll through slides
    if(controlBox[i].name === ">"){
      picCounter++;
      if (picCounter === picRay.length){
        picCounter = 0;
        $("#pic").attr("src", picRay[picCounter].src);
        $("#link").attr("href", picRay[picCounter].lnk);
        $("#link").text(picRay[picCounter].name);
      }else{
        $("#pic").attr("src", picRay[picCounter].src);
        $("#link").attr("href", picRay[picCounter].lnk);
        $("#link").text(picRay[picCounter].name);

      };
    };
    if(controlBox[i].name === "<"){
      picCounter--;
      if (picCounter < 0){
        picCounter = picRay.length-1;
        $("#pic").attr("src" , picRay[picCounter].src);
        $("#link").attr("href", picRay[picCounter].lnk);
        $("#link").text(picRay[picCounter].name);

      }else{
        $("#pic").attr("src", picRay[picCounter].src);
        $("#link").attr("href", picRay[picCounter].lnk);
        $("#link").text(picRay[picCounter].name);

      };
    }


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
  player.y = player.y+9
  points = points+1
}

// display score
if(points>0){
  Score();
}



// player block
// context.fillStyle = "red";
// context.fillRect(player.x, player.y, player.width, player.height);
//put skin on players
if(player.dead === 0){
  context.drawImage(player.skin,player.x, player.y, player.width, player.height)
}else{Die();}

//moving box/player interaction
if(player.x >= cloud.x-15 && player.x <= cloud.x+15 && player.y <= cloud.y && player.y >= cloud.y-14){
  player.x = player.x + 1
};
// display lives
for (i=0; i<lives.length; i++){
  context.fillRect(lives[i].x,lives[i].y,lives[i].width,lives[i].height)
};

// display game over
if (lives.length === 0){
  context.fillstyle = "Red";
  Lose();
}





requestAnimationFrame(update);
}
///////check collision
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

  $('#easy').click(function(){
    Reset();
    if(game.mode==="hard"){
      game.mode = "easy"
      $('#mode').html("<b>Easy Mode<br></b>use the mouse to navigate")
    }else{game.mode = "hard"
    $('#mode').html("<b>Hard Mode<br></b>use the arrow keys to navigate")
  };
  $('#easy').toggleClass('hardToggle')
  $("#easyButtons").toggleClass('hide');
  $("#gamebg").toggleClass('gamebg');
  $(".carousel").toggleClass('wallpaper');
  $('canvas').toggleClass('mouseless')
});

    ///////////////////////////easy mode
    $('#artShow').click(function(){
      console.log('clicked')
      controlBox[3].active = true
      controlBox[2].active = false
      controlBox[4].active = false
      picCounter = 1;
      picRay = artPic;
      $("#pic").attr("src", picRay[picCounter].src);
      $("#easyLink").attr("href", picRay[picCounter].lnk);
      $("#easyLink").text(picRay[picCounter].name);
    });
    $('#adsShow').click(function(){
      console.log('clicked')
      controlBox[4].active = true
      controlBox[2].active = false
      controlBox[3].active = false
      picCounter = 1;
      picRay = adPic;
      $("#pic").attr("src", picRay[picCounter].src);
      $("#easyLink").attr("href", picRay[picCounter].lnk);
      $("#easyLink").text(picRay[picCounter].name);
    });
    $('#webShow').click(function(){
      console.log('clicked')
      controlBox[2].active = true
      controlBox[4].active = false
      controlBox[3].active = false
      picCounter = 1;
      picRay = projPic;
      $("#pic").attr("src", picRay[picCounter].src);
      $("#easyLink").attr("href", picRay[picCounter].lnk);
      $("#easyLink").text(picRay[picCounter].name);
    });

      ///////////////////////////easy slide directional buttons
      $('#forward').click(function(){
        picCounter++;
        if (picCounter === picRay.length){
          picCounter = 0;
        }
        $("#pic").attr("src", picRay[picCounter].src);
        $("#easyLink").attr("href", picRay[picCounter].lnk);
        $("#easyLink").text(picRay[picCounter].name);
      });

      $('#back').click(function(){
        picCounter--;
        if (picCounter < 0){
          picCounter = picRay.length-1;
        }
        $("#pic").attr("src" , picRay[picCounter].src);
        $("#easyLink").attr("href", picRay[picCounter].lnk);
        $("#easyLink").text(picRay[picCounter].name);


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
