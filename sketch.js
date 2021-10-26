var michaelJackson, rua, chimaelMackson, ura, obstaculos, osisbaculos,gObstaculos,msg, tank,kant,gTank,difer, aviao,viao,gAviao;
var JOGAR=1;
var PERDEU=0;
var estado=JOGAR;
var pontuaco=0;
function preload(){
    chimaelMackson = loadAnimation( "Jake1.png","Jake2.png","jake4.PNG");

  ura = loadImage("grama.jpg");
  kant=loadImage("tank.jpg");
  osisbaculos = loadImage("bomb.png");
  viao=loadImage("bombardeiro.jpg");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  rua = createSprite(width/2, height/2, width,height);
  rua.addImage(ura)
  rua.scale = height/200;
  rua.velocityY=height/250;
  
  michaelJackson = createSprite(200,height-100,34,43);
  michaelJackson.addAnimation("hrtsfg", chimaelMackson);
  michaelJackson.scale=width/1600; 
  michaelJackson.depth=rua.depth;
  michaelJackson.depht++;
  
  
 //michaelJackson.debug=true;
 michaelJackson.setCollider("rectangle",0,0,50,130);
  
  
  gAviao=new Group();
  gTank=new Group();
  gObstaculos=new Group();
}

function draw() {
  console.time();
  background("black");
 drawSprites();
  pontuaco=0;
 
  if(estado==JOGAR){
 
     pontuaco=Math.round(frameCount/1500);
 
  fill("blue");
  textSize(width/30);
  text("dificuldade: "+pontuaco ,width/2,height/8);
   
    if(michaelJackson.x<0||michaelJackson.x>width){
      michaelJackson.x=width/2;
    }
    if(frameCount%600==0){
      avioes();
    }
    
if(frameCount%350==0||frameCount%360==0||frameCount%370==0||frameCount%380==0){
  tanques();
}
    
    if(keyDown("a")){
    michaelJackson.x=michaelJackson.x-width/130;
  }
   if(keyDown("d")){
    michaelJackson.x=michaelJackson.x+width/130;
  }
  if(rua.y>height-250){
    rua.y=rua.y-height/2.3;
  }
  if(frameCount%60==0){
    obsitaculos();  
  }
if(michaelJackson.isTouching(gObstaculos)||michaelJackson.isTouching(gTank)||michaelJackson.isTouching(gAviao)){
estado=PERDEU;
 gObstaculos.destroyEach();

  

}
}
if(estado==PERDEU){
rua.velocityY=0;
 gObstaculos.destroyEach();
  michaelJackson.x=width*2
textSize(width/20); fill("red"); text("perdeu, aperte enter para recomeçar ",width/8,height/2);
  gTank.destroyEach();
   
 if(keyDown("enter")){
   reset();
 }
  
  
 }
  console.timeEnd();
 
}
  function obsitaculos(){
    obstaculos=createSprite(width/2,0);
    obstaculos.addImage(osisbaculos);
    obstaculos.velocityY=height/100;
    obstaculos.scale = width/6300
    obstaculos.x=Math.round(random(0,width));
    obstaculos.lifetime=500;
    obstaculos.setCollider("circle",-30,30,obstaculos.width-270);  
    obstaculos.velocityY=obstaculos.velocityY+pontuaco;
    //obstaculos.debug=true;
    gObstaculos.add(obstaculos);
    
  }
  
function tanques(){
  tank=createSprite(width/2,0);
  tank.addImage(kant);
  tank.velocityY=height/80;
  tank.velocityY=tank.velocityY+pontuaco;
  tank.x=Math.round(random(0,width));
  tank.lifetime=height/95;
  tank.scale=width/2300;
  //tank.debug=true;
  gTank.add(tank);
  gTank.depth=rua.depth
  gTank.depth++;

  
}

function reset(){
  estado=JOGAR;
  rua.velocityY=height/250;
  michaelJackson.x=width/2;  
  pontuaco=0;
}
  function avioes(){
    aviao=createSprite(michaelJackson.x,-50);
    aviao.addImage(viao);
    aviao.debug=true;
    aviao.scale=width/1700;
    aviao.velocityY=height/40+(pontuaco/3);
    aviao.lifetime=height/40;
    aviao.depth=rua.depth;
    aviao.depth++;
    gAviao.add(aviao);
  }









