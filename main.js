var h = window.innerHeight;
var w = window.innerWidth;
var bullets;
var tentacles;
var sprt;
var player;
var boss;
var arrow;
var circ;
var r_circle;
var wave = 1;
var death_status = 0;

function setup() {
  createCanvas(w, h);
  

  circ = loadImage('libraries/Circle_Blue.png');
  r_circle = loadImage('libraries/Circle_Red4.png');
  arrow = loadImage('libraries/arrow.png')
  sprt = createSprite(width/2, height/3);
  sprt.addImage(arrow);
  sprt.scale = 0.1;
  sprt.maxSpeed = 9;
  sprt.friction = 0.05;
  
  player = new player();
  boss = new boss();
  
  bullets = new Group();
  tentacles = new Group();

  var sprtb = createSprite(200+(100*i), h/2);
  sprtb.addImage(r_circle);
  sprtb.setCollider('circle', 0, 0, 275);
  sprtb.scale = 0.25;
  sprtb.mass = sprtb.scale;
  tentacles.add(sprtb);

  for (var i = 1; i<4; i++) {
    var sprtb = createSprite(200+(100*i), h/2);
    sprtb.addImage(circ);
    sprtb.setCollider('circle', 0, 0, 340);
    sprtb.scale = 0.25;
    sprtb.mass = sprtb.scale;
    tentacles.add(sprtb);
  }

  for (var i = 0; i<tentacles.length; i++) {
    tentacles[i].maxSpeed = 5;
    tentacles[i].friction = 0.2;
  }
}

function draw() {
  background(0);
  
  boss.revive();
  drawSprites();
  boss.update();
  tentacles.displace(tentacles);
  player.border();
  player.movement();
  player.shoot();
  player.death();
  boss.b_life();
  boss.b_move();
  boss.b_border();
  
  textSize(25);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Wave: "+wave, width/2, h/20);
}

function player() {
  this.x = w/2;
  this.y = h/2;
  this.movement = function() {
    if (keyIsDown(LEFT_ARROW)) {
      sprt.rotation -= 4;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      sprt.rotation += 4;
    }

    if (keyIsDown(UP_ARROW)) {
      sprt.addSpeed(0.3, sprt.rotation)
    }

    if (keyIsDown(DOWN_ARROW)) {
      sprt.addSpeed(-0.3, sprt.rotation)
    }
  }

  this.shoot = function() {
    if (death_status!=1) {
      if (keyWentDown('Space')) {
        var bullet = createSprite(sprt.position.x, sprt.position.y, 5, 5);
        bullet.shapeColor = color(255);
        bullet.setSpeed(15+sprt.getSpeed(), sprt.rotation);
        bullet.life = 30;
        bullets.add(bullet);
      }
      
    }
    
  }

  this.border = function() {
    if (sprt.position.x < -10) {
      sprt.position.x=w+10;
    }
    if (sprt.position.x > w+10) {
      sprt.position.x=-10;
    }
    if (sprt.position.y < -10) {
      sprt.position.y=h+10;
    }
    if (sprt.position.y > h+10) {
      sprt.position.y=-10;
    }
  }

  this.death = function() {
    for (var i = 0; i<tentacles.length; i++) {
      if (tentacles[i].overlap(sprt)) {
        sprt.remove();
        fill(255);
        // noStroke();
        textSize(75);
        textAlign(CENTER, CENTER);
        text("Game Over", width/2, height/2);
        death_status = 1;
        
      }
    }
  }
}

function boss() {
  this.hp1 = [4, 4, 4, 4];
  this.b_life = function() {

    if (tentacles[0] != undefined) {
      if (bullets.overlap(tentacles[0])) {
        if (this.hp1[0] > 0) {
          tentacles[0].scale -= 0.05;
          this.hp1[0] -=  1;
        }
        else {
          this.hp1.splice(0, 1);
          tentacles[0].remove();
        }
        bullets[0].remove();
      }
       for (var i = 1; i<tentacles.length; i++) {
         if (bullets.overlap(tentacles[i])) {
           tentacles[i].scale += 0.05;
           this.hp1[i] += 1;
           bullets[0].remove();
         }
       }
    }
    
    if (this.hp1[0] == undefined) {
      this.hp1 = [4, 4, 4, 4];
    }
  }
  
  this.b_move = function() {
    if (tentacles[0] != undefined) {
      tentacles[0].attractionPoint(0.5, sprt.position.x, sprt.position.y);
      for (var i = 1; i<tentacles.length; i++) {
        tentacles[i].attractionPoint(0.99, tentacles[i-1].position.x, tentacles[i-1].position.y);
      }
      tentacles[0].immovable = true;
    }
    
  }
  
  this.b_border = function() {
    for (var i = 0; i<tentacles.length; i++) {
      if (tentacles[i].position.y > h+250) {
        tentacles[i].position.y = -200;
      }
    }
  }

  this.drag = 0.2;

  this.revive = function() {
    if (tentacles[0]==undefined) {
      var sprtb = createSprite(200+(100*i), sprt.position.y+600);
      sprtb.addImage(r_circle);
      sprtb.setCollider('circle', 0, 0, 275);
      sprtb.scale = 0.25;
      sprtb.mass = sprtb.scale;
      tentacles.add(sprtb);
  
      for (var i = 1; i<4; i++) {
        var sprtb = createSprite(200+(100*i), sprt.position.y+600);
        sprtb.addImage(circ);
        sprtb.setCollider('circle', 0, 0, 340);
        sprtb.scale = 0.25;
        sprtb.mass = sprtb.scale;
        tentacles.add(sprtb);
      }
  
      for (var i = 0; i<tentacles.length; i++) {
        this.drag -= 0.005;
        tentacles[i].maxSpeed = 5;
        tentacles[i].friction = this.drag;
      }
  
      wave += 1;
    }
  }

  this.update = function() {
    if (this.life_l != tentacles.length) {
      tentacles[0].addImage(r_circle);
    }
    this.life_l = tentacles.length;
  }
}
