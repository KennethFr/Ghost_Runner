var PLAY =1;
var End =0;
var gameState=PLAY;

var ghost, ghostJumping, ghostStanding;
var tower,towerImage;
var doorImg,climbDoorImg;
var doorGroup;
var climberGroup;

function preload(){
  ghostJumping=loadImage("ghost-jumping.png");
  ghostStand=loadImage("ghost-standing.png");
  towerImage=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climbDoorImg=loadImage("climber.png");
}
function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300,10,10);
  tower.addImage(towerImage);
  ghost=createSprite(300,300,10,10);
  ghost.addImage(ghostStand);
  ghost.scale=0.4;
  doorGroup= new Group();
  climberGroup = new Group();
  
}
function draw(){
background(0);
  if (gameState===PLAY){
      drawSprites();
      tower.velocityY=4;
    if(tower.y>400){
  tower.y=height/2;
}
    if (keyDown("space")){
      ghost.velocityY=-8;
    }
    if (keyWentDown("space")){
      ghost.addImage(ghostJumping);
    }
        if (keyWentUp("space")){
      ghost.addImage(ghostStand);
    }
    ghost.velocityY= ghost.velocityY+1;
    if (keyDown("left")){
      ghost.x=ghost.x-2;
    }
        if (keyDown("right")){
      ghost.x=ghost.x+2;
    }
    spawnDoor();
    if (doorGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    if (climberGroup.isTouching(ghost)){
      gameState=End;
    }
  }
  if (gameState===End){
    tower.velocityY=0 ; 
  fill("white");
    textSize(30);
    text("GAMEOVER",230,300);
  //  ghost.destroy();
    doorGroup.setVelocityYEach(0);
    climberGroup.setVelocityYEach(0);
    text ("Press R To Begin",200,350)
    
  }
if (keyDown ("r")){
  gameState=PLAY;
  doorGroup.destroyEach();
  climberGroup.destroyEach();
}
  
}
function spawnDoor(){
  if (frameCount%200===0){
    var door = createSprite(Math.round(random(100,400)),0,10,10);
    door.addImage(doorImg);
    door.velocityY=+2;
    doorGroup.add(door);
    var climber=createSprite(door.x,door.y+60,10,10);
        climberGroup.add(climber);
    climber.addImage(climbDoorImg);
    climber.velocityY=+2;
  }
}