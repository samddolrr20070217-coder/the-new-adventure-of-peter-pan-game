const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const keys = {};

document.addEventListener("keydown",(e)=>{
  keys[e.key] = true;
});

document.addEventListener("keyup",(e)=>{
  keys[e.key] = false;
});

const player = {
  x:100,
  y:350,
  width:50,
  height:70,
  speed:5,
  color:"lime",
  jump:false,
  velocityY:0
};

const gravity = 0.5;

const pirates = [
  {x:700,y:360,width:50,height:60,color:"red"},
  {x:1200,y:360,width:50,height:60,color:"red"},
  {x:1700,y:360,width:50,height:60,color:"red"}
];

const clouds = [
  {x:100,y:80,size:50},
  {x:400,y:60,size:70},
  {x:800,y:100,size:60}
];

let cameraX = 0;

function movePlayer(){

  if(keys["ArrowRight"]){
    player.x += player.speed;
  }

  if(keys["ArrowLeft"]){
    player.x -= player.speed;
  }

  if(keys["ArrowUp"] && !player.jump){
    player.velocityY = -12;
    player.jump = true;
  }

  player.y += player.velocityY;
  player.velocityY += gravity;

  if(player.y >= 350){
    player.y = 350;
    player.jump = false;
    player.velocityY = 0;
  }

  cameraX = player.x - 200;
}

function drawBackground(){

  ctx.fillStyle = "#4fc3f7";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "white";

  clouds.forEach(cloud=>{
    ctx.beginPath();
    ctx.arc(cloud.x-cameraX*0.2,cloud.y,30,0,Math.PI*2);
    ctx.arc(cloud.x+30-cameraX*0.2,cloud.y,35,0,Math.PI*2);
    ctx.arc(cloud.x+60-cameraX*0.2,cloud.y,30,0,Math.PI*2);
    ctx.fill();
  });

  ctx.fillStyle = "green";
  ctx.fillRect(0,420,3000,80);

  ctx.fillStyle = "#228B22";

  for(let i=0;i<20;i++){

    ctx.fillRect(i*150-cameraX,340,40,80);

    ctx.beginPath();
    ctx.arc(i*150+20-cameraX,320,40,0,Math.PI*2);
    ctx.fill();
  }
}

function drawPlayer(){

  ctx.fillStyle = player.color;

  ctx.fillRect(
    player.x-cameraX,
    player.y,
    player.width,
    player.height
  );

  ctx.fillStyle = "yellow";

  ctx.beginPath();

  ctx.arc(
    player.x+25-cameraX,
    player.y-10,
    20,
    0,
    Math.PI*2
  );

  ctx.fill();

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Peter Pan",20,30);
}

function drawPirates(){

  pirates.forEach(pirate=>{

    ctx.fillStyle = pirate.color;

    ctx.fillRect(
      pirate.x-cameraX,
      pirate.y,
      pirate.width,
      pirate.height
    );

    ctx.fillStyle = "black";

    ctx.fillText(
      "Pirate",
      pirate.x-cameraX-5,
      pirate.y-10
    );

    if(
      player.x < pirate.x + pirate.width &&
      player.x + player.width > pirate.x &&
      player.y < pirate.y + pirate.height &&
      player.y + player.height > pirate.y
    ){
      ctx.fillStyle = "red";
      ctx.font = "40px Arial";
      ctx.fillText("Pirate Battle!",350,100);
    }
  });
}

function drawStoryLocations(){

  ctx.fillStyle = "pink";
  ctx.fillRect(450-cameraX,320,80,100);

  ctx.fillStyle = "white";
  ctx.fillText("Wendy House",420-cameraX,300);

  ctx.fillStyle = "orange";
  ctx.fillRect(1400-cameraX,330,100,90);

  ctx.fillStyle = "white";
  ctx.fillText("Tiger Lily",1390-cameraX,310);

  ctx.fillStyle = "cyan";
  ctx.fillRect(2200-cameraX,330,120,90);

  ctx.fillStyle = "white";
  ctx.fillText("Lost Children",2180-cameraX,310);
}

function gameLoop(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  movePlayer();

  drawBackground();

  drawStoryLocations();

  drawPirates();

  drawPlayer();

  requestAnimationFrame(gameLoop);
}

gameLoop();
