
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600);

  score = 0;
  
   monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  //ground.x = ground.width/2;
  console.log(ground.x);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  background("white");
  text("Survival Time:" + score, 100, 50);
  

 if(ground.x<0){
   ground.x = ground.width/2;
 }
  
  if(monkey.y>300 && keyDown("space")){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  obstacle();
  banana();
  
  if(monkey.isTouching(obstacleGroup)){
    ground.velocityX = 0;
    monkey.velocityX = 0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  else
    {  score = Math.ceil(frameCount/frameRate());
}
  
  
  
  drawSprites();
  
  
}

function obstacle(){
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(600,315,40,10);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    obstacle.collide(ground);
     obstacleGroup.add(obstacle);
  
  }
}


function banana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,300,40,10);
    banana.y = Math.round(random(200,250));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}



