var h = window.innerHeight
var w = window.innerWidth
var player;
var sprt;

function setup() {
    createCanvas(w, h);
    background(0);
    //galaxy = loadImage("galaxy.png")
    //image(galaxy, w/2, h/2, width, height)
    player.update();
    var sprt = createSprite(h/2, w/2, 50, 50);
    sprt.shapeColor = color(255);
    player = new player();
}

function draw() {
    drawSprites();
}

function player() {
    this.x = w/2;
    this.y = h/2;
    this.update = function() {
        if (keyIsDown(LEFT_ARROW)) {
            sprt.setSpeed(2.5, 180);
        }

        else {
            sprt.setSpeed(0, 0);
        }

        if (keyIsDown(RIGHT_ARROW)) {
            sprt.setSpeed(2.5, 0);
        }

        else {
            sprt.setSpeed(0, 0);
        }

        if (keyIsDown(UP_ARROW)) {
            sprt.setSpeed(2.5, 270);
        }

        else {
            sprt.setSpeed(0, 0);
        }

        if (keyIsDown(DOWN_ARROW)) {
            sprt.setSpeed(2.5, 90);
        }

        else {
            sprt.setSpeed(0, 0);
        }
    }
}
