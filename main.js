var h = window.innerHeight
var w = window.innerWidth
//var player;
var sprt;

function setup() {
    createCanvas(w, h);
    background(0);
    galaxy = loadImage("galaxy.png")
    Image(galaxy, w/2, h/2, width, height)
    //player.update();
    var sprt = createSprite(height/2, width/2, 50, 50);
    sprt.shapeColor = color(255);
    //player = new player();
}

function draw() {
    drawSprites();
}

function player() {
    this.x = w/2;
    this.y = h/2;
    //this.update = function() {
        
    //}
}
