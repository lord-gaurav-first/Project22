var starImg, fairyImg, bgImg;
var fairy , fairyVoice;
var star, starBody;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload(){
	starImg = loadImage("img/star.png");
	fairyImg = loadAnimation("img/fairyImage1.png","img/fairyImage2.png");
	bgImg = loadImage("img/starNight.png");
	fairyVoice = loadSound("sound/JoyMusic.mp3");

}

function setup() {
	createCanvas(800, 750);

	 fairyVoice.play();

	fairy = createSprite(130, 520, 10, 10);
	fairy.addAnimation("fairyflying",fairyImg);
	fairy.scale =0.25;
	fairy.setCollider('circle', 495, -16, 120);

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);

	Engine.run(engine);

}


function draw() {
  background(bgImg);

  drawSprites();

	star.x= starBody.position.x;
	star.y= starBody.position.y;

	if (star.isTouching(fairy)){
		Body.setStatic(starBody, true);
	}

	keyPressed();

}

function keyPressed() {
	if (keyDown("RIGHT_ARROW")){
		fairy.x= fairy.x+10;
	}else if (keyDown("LEFT_ARROW")){
		fairy.x= fairy.x-10;
	}else if (keyDown("DOWN_ARROW")){
		Body.setStatic(starBody, false);
	}
}

function autoRefresh( t ) {
   setTimeout("location.reload(true);", t);
}
