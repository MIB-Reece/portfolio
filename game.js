var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");

var keys = [];

var width = 900, height = 200, speed = 3;

var score = 0;

var player = {
    x: 10,
    y: 10,
    width: 20,
    height: 20
};

var cube = {
    x: Math.random() * (width - 20),
    y: Math.random() * (height - 20),
    width: 20,
    height: 20
};

window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
}, false);

window.addEventListener("keyup", function (e) {
    delete keys[e.keyCode];
}, false);

/*
up - 38
down - 40
left - 37
right - 39
*/

function game(){
    update();
    render();
}

function  update(){
    if(keys[38]) player.y-=speed;
    if(keys[40]) player.y+=speed;
    if(keys[37]) player.x-=speed;
    if(keys[39]) player.x+=speed;

    if(player.x < 0) player.x = 0;
    if(player.y < 0) player.y = 0;
    if(player.x >= width - player.width)
    player.x = width - player.width;
    if(player.y >= height - player.height)
    player.y = height - player.height;

    if(collision(player, cube)) process();

    if(score > 1) speed = 6;
    if(score > 2) speed = 12;
    if(score > 6) speed = 18;
    if(score > 8) speed = 30
    if(score > 10) alert("Game Over You Won !"), score = 0, speed = 3, update();
}

function render(){
    context.clearRect(0, 0, width, height);

    context.fillStyle = "black";
    context.fillRect(player.x, player.y, player.width, player.height)

    context.fillStyle = "green";
    context.fillRect(cube.x, cube.y, cube.width, cube.height)

    context.font = "bold 30px helvetica ";
    context.fillText(score, 25 ,25);
}

function collision(first, second){
    return !(first.x > second.x + second.width ||
             first.x + first.width < second.x ||
             first.y > second.y + second.height ||
             first.y + first.height < second.y);
             //collision detection
}

function process(){
    score++;
    cube.x = Math.random() * (width - 20);
    cube.y = Math.random() * (height - 20);
}

setInterval(function(){
    game();
}, 1000/30)
