var h = window.innerHeight;
var w = window.innerWidth;
var bullets;
var tentacles;
var sprt;
var player;
var boss;
var restart;
var arrow;
var circ;
var r_circle;
var wave = 1;
var death_status = 0;
var startup = 0;
var goal = 1;

function setup() {
  createCanvas(w, h);
  
  circ = loadImage('https://scott-yang-21.github.io/Circle_Blue.png');
  r_circle = loadImage('https://scott-yang-21.github.io/Circle_Red4.png');
  arrow = loadImage('https://scott-yang-21.github.io/arrow.png')
  sprt = createSprite(width/2, height/2);
  sprt.addImage(arrow);
  sprt.scale = 0.1;
  sprt.maxSpeed = 9;
  sprt.friction = 0.05;
  
  player = new player();
  boss = new boss();
  restart = new restart();
  
  bullets = new Group();
  tentacles = new Group();

  var sprtb = createSprite(200+(100*i), height*1.2);
  sprtb.addImage(r_circle);
  sprtb.setCollider('circle', 0, 0, 275);
  sprtb.scale = 0.3;
  sprtb.mass = sprtb.scale;
  tentacles.add(sprtb);

  for (var i = 1; i<4; i++) {
    var sprtb = createSprite(200+(100*i), height*1.2);
    sprtb.addImage(circ);
    sprtb.setCollider('circle', 0, 0, 340);
    sprtb.scale = 0.3;
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
  
  if ((startup == 0)&&(keyCode!=75)) {
    fill(255);  
    textSize(75);
    textAlign(CENTER, CENTER);
    text("DARWINISM", width/2, height*0.2);
    textSize(25);
    text("Avoid being hit by the snake", width/2, height*0.35);
    text("Avoid shooting the Blue", width/2, height*0.4);
    text("Shoot the Red", width/2, height*0.45);
    text("Control Character with Arrow Keys", width/2, height*0.55)
    text("Press SPACEBAR to Shoot", width/2, height*0.6)
    text("Press 'k' to start", width/2, height*0.7)
    restart.goal();
  }

  else {
    if (death_status==0) {
      startup = 1;
      goal = 0;
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
    }
    
    else {
      restart.restarting();
      death_status = 0;
      startup = 0;
    }

    textSize(25);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Wave: "+wave, width/2, h/20);
  }
}

function restart() {
  this.restarting = function() {
    
    /*sprt = createSprite(width/2, height/2);
    sprt.addImage(arrow);
    sprt.scale = 0.1;
    sprt.maxSpeed = 9;
    sprt.friction = 0.05;

    sprt.position.x = width/2;
    sprt.position.y = height/2;

    //attempting to change respawn method
    for (var j=0; j<5; j++) {
      tentacles[j].remove()
    }

    var sprtb = createSprite(200+(100*i), height);
    sprtb.addImage(r_circle);
    sprtb.setCollider('circle', 0, 0, 275);
    sprtb.scale = 0.3;
    sprtb.mass = sprtb.scale;
    tentacles.add(sprtb);

    for (var i = 1; i<4; i++) {
      var sprtb = createSprite(200+(100*i), sprt.position.y+600);
      sprtb.addImage(circ);
      sprtb.setCollider('circle', 0, 0, 340);
      sprtb.scale = 0.3;
      sprtb.mass = sprtb.scale;
      tentacles.add(sprtb);
    }

    for (var c = 0; c<tentacles.length; c++) {
      //this.drag -= 0.005;
      tentacles[c].maxSpeed = 5;
      tentacles[c].friction = 0.2;
    }*/

    sprt = createSprite(width/2, height/2);
    sprt.addImage(arrow);
    sprt.scale = 0.1;
    sprt.maxSpeed = 9;
    sprt.friction = 0.05;

    sprt.position.x = width/2;
    sprt.position.y = height/2;

    for (var y=0; y<tentacles.length; y++) {
      tentacles[y].position.x = 200+(150*y); //changed '100' to '150'
      tentacles[y].position.y = height*1.2;
      tentacles[y].scale = 0.3;
      tentacles[y].maxSpeed = 5;
      boss.drag = 0.2
      tentacles[y].friction = boss.drag;
    }

    boss.hp1 = [3, 3, 3, 3];
    wave = 1;
  }

  this.goal = function() {
    if (goal == 0) {
      fill(255);  
      textSize(25);
      textAlign(CENTER, CENTER);
      if (this.progress < wave) {
        this.progress = wave;
      }
      text("The longest you've lasted is Wave " + this.progress, width/2, height*0.9)
    }
    else {
      this.progress = wave;
    }
  }
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
        textSize(25);
        text("reload page to play again", width/2, height*0.6)
        death_status = 1;
        startup = 0;
      }
    }
  }
}

function boss() {
  this.hp1 = [3, 3, 3, 3];
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
      this.hp1 = [3, 3, 3, 3];
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
      sprtb.scale = 0.3;
      sprtb.mass = sprtb.scale;
      tentacles.add(sprtb);
    
      
      for (var i = 1; i<4; i++) {
        var sprtb = createSprite(200+(100*i), sprt.position.y+600);
        sprtb.addImage(circ);
        sprtb.setCollider('circle', 0, 0, 340);
        sprtb.scale = 0.3;
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
