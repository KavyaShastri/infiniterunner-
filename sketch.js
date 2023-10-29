//creating game states
//declaring text sprite for adding score
//declaring the sprites

//declaring the game states
var LOGO = 2;
var PLAY = 1;
var END = 0;
var justText

var gameState = LOGO;
//declaring characters of the game
var asteroid, asteroidImage;
var spaceship, spaceshipImage
var rocket, rocketImage;
var star, starImage;
var saturn, saturnImage;
var earth, earthImage;
var mercury, mercuryImage;
var sun, sunImage;
var moon, moonImage;
var galaxy2, galaxy2Image;
var galaxy1, galaxy1Image;
var logo, logoImage
var astronaut, astronaut_image
var nicePlanet, nicePlanet_image;
var flare, flareImage;
var sound1, sound2, sound3;
var soundTrack;
var opener, openerImage;
var crashSound;
//declaring sprites for end states
var gameOver, gameOverImage;
var restart, restartImage

//declaring groups
var asteroidsGroup;
var spaceshipsGroup
var starsGroup;
var moonGroup;
var mercuryGroup;
var sunGroup;
var galaxy1Group;
var galaxy2Group;
var saturnGroup;
var earthGroup;
var astronautGroup;

//declaring  score 
var score;
var attempts;

//declaring edges
var edges;

//assigning images to sprites
function preload() {
  sunImage = loadImage("sun.png");
  
  logoImage = loadImage("Ast.png");
  moonImage = loadImage("moon.png");
  sound1 = loadSound("whatever.mp3");
  sound2 = loadSound("whatever.mp3");
  sound3 = loadSound("whatever.mp3");
  flareImage = loadImage("flare.png");
  earthImage = loadImage("earth.png");
  starImage = loadImage("startle.png");
  saturnImage = loadImage("saturn.png");
  soundTrack = loadSound("whatever.wav");
  galaxy2Image = loadImage("galaxy2.png");
  mercuryImage = loadImage("mercury.png");
  restartImage = loadImage("restart.png");
  openerImage = loadImage("Whatever.png");
  rocketImage = loadImage("rocketeer.png");
  galaxy1Image = loadImage("milkyWay.png");
  asteroidImage = loadImage("asteroid.png");
  spaceshipImage = loadImage("spaceship.png")
  gameOver_Image = loadImage("gameover.jpg");
  nicePlanet_Image = loadImage("nicePlanet.png");
  astronaut_Image = loadImage("Coolastronaut.png");
  rocketImage = loadImage("awesomerocketimage.png");

  crashSound = loadSound("crash2.mp3");
}

//setting the game up
function setup() {
  createCanvas(windowWidth, windowHeight);
  //declaring rocket
  rocket = createSprite(windowWidth / 2, windowHeight - 50, 20, 5);
  rocket.addImage("rocket", rocketImage);
  rocket.scale = 0.24;
  score = 0;
  attempts = 0;
  edges = createEdgeSprites();


  ///declaring groups
  asteroidsGroup = new Group();
  spaceshipsGroup = new Group()
  starsGroup = new Group();
  moonGroup = new Group();
  mercuryGroup = new Group();
  sunGroup = new Group();
  galaxy1Group = new Group();
  galaxy2Group = new Group();
  saturnGroup = new Group();
  earthGroup = new Group();
  astronautGroup = new Group();
  nicePlanetGroup = new Group();
  flareGroup = new Group();
  //Declaring logo
  logo = createSprite(windowWidth / 2, windowHeight / 2, 10, 10);
  logo.addImage(logoImage);
  logo.scale = 1.2;
  logo.visible = true;
  //declaring message for clicking space
  opener = createSprite(logo.y+ 100, windowHeight - 215, 10, 10);
  opener.addImage(openerImage);
  opener.scale = 0.2;
  opener.visible = true;
  opener.velocityX=5;

  //declaring sprites for end Game state
  gameOver = createSprite(windowWidth / 2, windowHeight / 2, 10, 10);
  gameOver.addImage(gameOver_Image);
  gameOver.scale = 0.6;
  restart = createSprite(windowWidth - 360, windowHeight / 2, 10, 10);
  restart.addImage(restartImage);
  restart.scale = 0.7;
  //setting for deciding time for end state sprites
  gameOver.visible = false;
  restart.visible = false;
}


function draw() {

  textSize(30);
  text("Attempts: " + attempts, windowWidth - 250, windowHeight - 400);
  ///creating edges
  edges = createEdgeSprites();
  if (gameState === LOGO) {
    soundTrack.play();
      if (opener.x>windowWidth+100){
    opener.x=0;
  }

    //sound2.play();
    //sound3.play();
    background(260);
    rocket.visible = false;
    if (keyDown("space")) {
      gameState = PLAY;
    }
  }
  if (gameState === PLAY) {
    rocket.collide(edges);
    gameOver.visible = false;
    restart.visible = false;
    logo.visible = false;
    opener.visible = false;
    soundTrack.play();
    background(20);
    textSize(30);
    text("Score: " + score, windowWidth - 250, windowHeight - 350);
    score = score + Math.round(frameCount / 180);
    rocket.visible = true;
    if (keyDown("LEFT_ARROW")) {
      rocket.x = rocket.x - 34;
    }
    if (keyDown("RIGHT_ARROW")) {
      rocket.x = rocket.x + 34;
    }
    asteroidShower();
    spaceshipShower();
    rocketVelocity();

    rocket.setCollider("circle", 0, 0, 150);


    if (asteroidsGroup.isTouching(rocket)) {

      attempts = attempts + 1;
      gameState = END;
      asteroid.velocityY = 0;
      sound2.play();
      crashSound.play();
    }
    if (spaceshipsGroup.isTouching(rocket)) {

      attempts = attempts + 1;
      gameState = END;
      asteroid.velocityY = 0;
      sound2.play();
      crashSound.play();
    }
    if (asteroidsGroup.isTouching(spaceship)) {

     spaceship.visible= false;
      
    }


  }
  if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    asteroidsGroup.setVelocityYEach(0);
    asteroidsGroup.destroyEach();

    spaceshipsGroup.setVelocityYEach(0);
    spaceshipsGroup.destroyEach();

    sunGroup.destroyEach();
    moonGroup.destroyEach();
    galaxy1Group.destroyEach();
    galaxy2Group.destroyEach();
    mercuryGroup.destroyEach();
    saturnGroup.destroyEach();
    earthGroup.destroyEach();
    astronautGroup.destroyEach();
    flareGroup.destroyEach();
    nicePlanetGroup.destroyEach();
    starsGroup.setVelocityYEach(0);
    rocket.x = windowWidth - 900;
    rocket.y = windowHeight / 2;

    if (mousePressedOver(restart)) {
      reset();
    }

  }
  drawSprites();
}
//adding obstacles
function asteroidShower() {
  if (frameCount % 10 === 0) {
    asteroid = createSprite(30, 0, 500, 500);
    asteroid.addImage("asteroid", asteroidImage);
    asteroid.setCollider("circle", 0, 40, 415);

    asteroid.x = Math.round(random(windowWidth));
    asteroid.velocityY = +(10 + 5 * score / 1000)
    asteroid.scale = 0.09;
    //adding asteroids in asteroids group
    asteroidsGroup.add(asteroid);
    asteroid.depth = asteroid.depth + 5;
  }


}
function spaceshipShower() {
  if (frameCount % 10 === 0) {
    spaceship = createSprite(30, 0, 500, 500);
    spaceship.addImage("spaceship", spaceshipImage);
    spaceship.setCollider("circle", 0, 20, 150);
   

    spaceship.x = Math.round(random(windowWidth));
    spaceship.velocityY = +(10 + 5 * score / 1000)
    spaceship.scale = 0.3;
    //adding asteroids in asteroids group
    spaceshipsGroup.add(spaceship);
    spaceship.depth = spaceship.depth + 5;
  }


}



//creating illusion for making rocket move
function rocketVelocity() {
  if (frameCount % 0.5 === 0) {
    star = createSprite(500, 0, 40, 10);
    star.x = Math.round(random(windowWidth));
    star.addImage(starImage);
    star.velocityY = 45;
    star.depth = rocket.depth;
    rocket.depth = rocket.depth + 1;
    star.scale = 0.02;
    starsGroup.add(star);
  }

  if (frameCount % 425 === 0) {
    earth = createSprite(500, 0, 40, 10);
    earth.addImage(earthImage);
    earth.x = Math.round(random(windowWidth));
    earth.scale = 0.4;
    earth.velocityY = 10;
    earthGroup.add(earth);



  }


  if (frameCount % 336 === 0) {
    saturn = createSprite(500, 0, 40, 10);
    saturn.addImage(saturnImage);
    saturn.x = Math.round(random(windowWidth));
    saturn.scale = 0.4;
    saturn.velocityY = 20;
    saturnGroup.add(saturn);


  }

  if (frameCount % 243 === 0) {
    galaxy2 = createSprite(500, 0, 40, 10);
    galaxy2.addImage(galaxy2Image);
    galaxy2.x = Math.round(random(windowWidth));
    galaxy2.scale = 0.4;
    galaxy2.velocityY = 15;
    galaxy2Group.add(galaxy2);
  }

  if (frameCount % 159 === 0) {
    galaxy1 = createSprite(500, 0, 40, 10);
    galaxy1.addImage(galaxy1Image);
    galaxy1.x = Math.round(random(windowWidth));
    galaxy1.scale = 0.2;
    galaxy1.velocityY = 15;
    galaxy1Group.add(galaxy1);
  }

  if (frameCount % 744 === 0) {
    sun = createSprite(500, 0, 40, 10);
    sun.addImage(sunImage);
    sun.x = Math.round(random(windowWidth));
    sun.scale = 0.5;
    sun.velocityY = 10;
    sunGroup.add(sun);

  }
  if (frameCount % 673 === 0) {
    mercury = createSprite(500, 0, 40, 10);
    mercury.addImage(mercuryImage);
    mercury.x = Math.round(random(windowWidth));
    mercury.scale = 0.5;
    mercury.velocityY = 45;
    mercuryGroup.add(mercury);
  }
  if (frameCount % 288 === 0) {
    moon = createSprite(500, 0, 40, 10);
    moon.addImage(moonImage);
    moon.scale = 0.5;
    moon.x = Math.round(random(windowWidth));
    moon.velocityY = 5;
    moonGroup.add(moon);

  }
  if (frameCount % 388 === 0) {
    astronaut = createSprite(0, 300, 40, 10);
    astronaut.addImage(astronaut_Image);
    astronaut.scale = 0.1;
    astronaut.y = Math.round(random(windowWidth));
    astronaut.velocityX = 5;
    astronautGroup.add(astronaut);

  }
  if (frameCount % 456 === 0) {
    nicePlanet = createSprite(500, 0, 40, 10);
    nicePlanet.addImage(nicePlanet_Image);
    nicePlanet.scale = 0.3;
    nicePlanet.x = Math.round(random(windowWidth));
    nicePlanet.velocityY = 5;
    nicePlanetGroup.add(nicePlanet);

  }
  if (frameCount % 233 === 0) {
    flare = createSprite(500, 0, 40, 10);
    flare.addImage(flareImage);
    flare.scale = 0.4;
    flare.x = Math.round(random(windowWidth));
    flare.velocityY = 5;
    flareGroup.add(flare);

  }
}
//to reset te game
function reset() {
  gameState = PLAY;
  starsGroup.destroyEach();
  score = 0;
  rocket.x = windowWidth / 2;
  rocket.y = windowHeight - 50;

}