var PLAY = 1
var END = 0
var gamestate = PLAY
var sword, swordImage
var score = 0
var fruitImage1, fruitImage2, fruitImage3, fruitImage4
var fruitsGroup
var alienAnimation
var gameOver, gameOverImage

function preload(){
  swordImage = loadImage("sword.png")
  fruitImage1 = loadImage("fruit1.png")
  //orange
  fruitImage2 = loadImage("fruit2.png")
  //apple
  fruitImage3 = loadImage("fruit3.png")
  //pear
  fruitImage4 = loadImage("fruit4.png")
  //banana
  alienAnimation = loadAnimation("alien1.png", "alien2.png")
  gameOverImage = loadImage("gameover.png")
}

function setup(){
  createCanvas(600, 400)
  
  //create sword
  sword = createSprite(20, 20, 300, 200)
  sword.addImage("swordImage", swordImage)
  sword.scale = 0.5
  
  gameOver = createSprite(300, 200, 20, 20)
  gameOver.addImage("gameOverImage", gameOverImage)
  gameOver.scale = 1.7
  
  //add group
  fruitsGroup = new Group()
  alienGroup = new Group()
}

function draw(){
 background("rgb(125, 70, 49)")
  
  fill("white")
  textSize(15)
  text("Score: "+ score, 520,30);
  
  //gamestate PLAY
  if (gamestate === PLAY) {
    //y and x of sword to follow mouse
  sword.y = World.mouseY
  sword.x = World.mouseX
    
  //add score if sword touches fruit
  if (fruitsGroup.isTouching(sword)) {
    fruitsGroup.destroyEach()
    score = score + 1
  }    
    
  if (alienGroup.isTouching(sword)) {
    gamestate = END
  }
   
  //calling fruit and alien function
  spawnFruits();
  spawnAliens();
    
  //let gameover sprite visible = false
  gameOver.visible = false
  }
  
  
  //gamestate END
  if (gamestate === END) {
    fruitsGroup.destroyEach();
    alienGroup.destroyEach();
    gameOver.visible = true
    
  }
    
  
  drawSprites();
}


function spawnFruits() {
  if(frameCount % 20 === 0) {
    var fruits = createSprite(600,0,10,40);
   fruits.velocityY = 6
    fruits.x = Math.round(random(20,400));
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruits.addImage(fruitImage1);
              break;
      case 2: fruits.addImage(fruitImage2);
        //banana
              break;
      case 3: fruits.addImage(fruitImage3);          
              break;
      case 4: fruits.addImage(fruitImage4);
              break;
      default: break;
    }
    
    //scale fruits and give lifetime
    fruits.scale = 0.25
    fruits.lifetime = 400
    
    //add fruits to groups
    fruitsGroup.add(fruits)
}
}

function spawnAliens() {
  if(frameCount % 20 === 0) {
  var aliens = createSprite(600, 0, 10, 40);
  aliens.x = Math.round(random(20, 600));
  aliens.velocityY = 6
  aliens.addAnimation("alienAnimation", alienAnimation);  
    
  alienGroup.add(aliens)  
  aliens.lifetime = 400
    }
  }