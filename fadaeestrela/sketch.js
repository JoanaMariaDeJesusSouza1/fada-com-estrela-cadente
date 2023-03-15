const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine,world;
var starImg, bgImg;
var star, starBody;
var fada, fadaImg,fadaEnd;
var sound;
var ground;

function preload() {
    starImg = loadImage("images/star.png");
    bgImg = loadImage("images/starNight.png");
    //carregar animação de fada 
    fadaImg = loadAnimation("./images/fairyImage1.png", "./images/fairyImage2.png");
    sound = loadSound("./sound/JoyMusic.mp3");
    fadaEnd = loadAnimation("./images/fairy.png");
}

function setup() {
    createCanvas(800, 750);

    engine = Engine.create();
    world=engine.world;

    //escrever código para tocar o som vozFada
    if(sound.isPlaying()){
        sound.play();
        sound.setVolume(0.5);
    }
    

    //criar sprite de fada e adicionar animação para fada
    fada = createSprite(100, 520,10,10);
    fada.addAnimation("fada", fadaImg);
    fada.addAnimation("fada1", fadaEnd);
    fada.scale =0.20;

  
    var options = {
        isStatic: true,
    }

    ground = Bodies.rectangle(400, 740, 800, 20, options);
    World.add(world, ground);

    var starOptions={
        restitution: 0.5, 
        isStatic:true
    }

    starBody = Bodies.circle(730, 30, 1,starOptions);
    World.add(world, starBody);
    
    star = Bodies.circle(550, 90, 1,starOptions);
    World.add(world, star);
    

    rectMode(CENTER);
    ellipseMode(RADIUS)
}

function draw() {
    background(bgImg);

    rect(ground.position.x, ground.position.y, 800, 20);

    push ()
    imageMode(CENTER);

    ellipse(starBody.position.x, starBody.position.y, 2,2);
    image(starImg,starBody.position.x, starBody.position.y,20,20)

    ellipse(star.position.x, star.position.y,2,2);
    image(starImg,star.position.x, star.position.y,25,25)
    pop()
    

    if (keyDown("d") || keyDown(RIGHT_ARROW)) {
        fada.x += 6;
    }

    if (keyDown("a") || keyDown(LEFT_ARROW)) {
        fada.x -= 6;
    }

    if (keyDown("w") || keyDown(UP_ARROW)) {
        fada.y -= 7;
    }

    if (keyDown("s") || keyDown(DOWN_ARROW)) {
        fada.y += 7;
    }

    if (fada.position.x > 470 && starBody.position.x > 470) {
        Matter.Body.setStatic(starBody,false)
    }

    if (fada.position.x > 270 && star.position.x > 470) {
        Matter.Body.setStatic(star,false)
    }

    Engine.update(engine);
    drawSprites();
}
