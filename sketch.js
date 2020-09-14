
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var backgroundimage;
var cage,cageimage;
var line1;
var danger,dangerimage; 
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var dangerg;
var score= 0;
var stop;
var restart,playicon;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  backgroundimage = loadImage("paint-illustrations-wild-natural_46176-154.jpg");
 
  cageimage = loadImage("prison.png");
  
  dangerimage = loadImage("danger.png");
  
  stop = loadAnimation("sprite_0.png");
  
  playicon = loadImage("restart.png");
  
}



function setup() {
  
   createCanvas(575,475);
  
   
  
  
  
   background = createSprite(0,0,650,650);
   background.addImage(backgroundimage);
   background.scale = 3;
   background.velocityX = -7;
  
   monkey = createSprite(70,430,10,10);
   monkey.addAnimation("running",monkey_running);
   monkey.addAnimation("gameend",stop);
   monkey.scale = 0.15;
   
   
  line1 = createSprite(200,465,450,1);
  line1.visible = false;
  
  obstacleGroup = createGroup(); 
  dangerg = createGroup();
  foodGroup = createGroup();
 
  
   if (obstacleGroup.isTouching(monkey)){
  
   prison();
    
      }  
  
  
 cage = createSprite(80,-80,10,10);
   cage.addImage(cageimage);
  cage.scale = 0.4;
 
  
  restart = createSprite(270,250,10,10);
  restart.addImage(playicon);
  restart.scale = 0.6;
  restart.visible = false;
  
  
  cage.setCollider("rectangle",0,0,400,370);
  //cage.debug = true;
  
}


function draw() {
 
   if(gameState === PLAY){
    
  
     spawnobstale();
     spawndanger();     
     spawnfood()
     
     // cage.collide(line1);
  
   //jump when the space key is pressed
     if(keyDown("space")&& monkey.y >= 400) {
        monkey.velocityY = -14;
        
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.6;
  
    
  
    if(foodGroup.isTouching(monkey)){
   
     foodGroup.destroyEach();  
     score = score + 1;  
     
       } 
 
  
     if (background.x < 0){
      background.x = background.width/2;
    }
     
     if(dangerg.isTouching(monkey)){
        
       foodGroup.velocityY = foodGroup.velocityY -0.4;
       dangerg.velocityY = dangerg.velocityY -0.4;
       obstacleGroup.velocityY =  obstacleGroup.velocityY -0.4;
       background.velocityX = background.velocityX -0.4;
       
        }
     
     if (obstacleGroup.isTouching(monkey)){
  
        gameState = END;
  
    }
     
     
  
     
  }
  
if (gameState === END){
  
  
  background.velocityX = 0;
  foodGroup.setVelocityXEach(0); 
  dangerg.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  
  cage.velocityY = 4;
  
  cage.collide(line1);
  
  score.Y = 200;
  
  
  restart.visible = true;
  
  if(line1.isTouching(cage)){
    monkey.changeAnimation("gameend",stop);
}
  
  if(mousePressedOver(restart)) {
      reset();
    }
  
  }
  
  
  
 monkey.collide(line1);
 cage.collide(line1);
  
monkey.collide(obstacleGroup);
  
drawSprites();  
  
   
     fill('hsl(160, 100%, 50%)');
  textSize(20);
  text(" Your score: "+score,450,50);
  
}

function spawnobstale(){
  
if(World.frameCount%300===0){ 
  
  obstacle=createSprite(600,430,10,10);
  obstacle.scale=0.2;
  obstacle.addImage(obstaceImage);
 
  
  obstacle.setlifetime = 100;
  obstacle.velocityX = -7;
  obstacleGroup.add(obstacle);
 
  
} 
}



  



function spawndanger(){
  
if(World.frameCount%370===0){ 
  
  danger=createSprite(600,430,10,10);
  danger.scale=0.1;
  danger.addImage(dangerimage);
 
  
  danger.setlifetime = 100;
  danger.velocityX = -7;
  dangerg.add(danger);
 
  
} 
}


function spawnfood(){
  
if(World.frameCount%80===0){ 
  
  banana=createSprite(600,random(200,400),10,10);
  banana.scale=0.1;
  banana.addImage(bananaImage);
 
  
  banana.setlifetime = 100;
  banana.velocityX = -7;
  foodGroup.add(banana);
 
  
} 
}
function reset(){
  
  gameState = PLAY;  
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  
  cage.y = -80;
  cage.x = 80;
  
         
  restart.visible = false;
  
  monkey.changeAnimation("running",monkey_running);
  
  score = 0;
  
  background.velocityX = -7 ;
  
}

