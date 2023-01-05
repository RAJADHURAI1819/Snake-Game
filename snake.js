var ff=true;
var dd=true;
var pg=document.getElementById("startgame")
var sc=document.getElementById("score")
class Snake{
    constructor(x,y,s,f){
this.x=x;
this.y=y;
this.s=s;
this.f=f;
this.tail = [{ x: this.x, y: this.y }]
    }
    init(){
        var newRect;
        var a
        if (this.f == "Right") {
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.s,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.f == "Left") {
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.s,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.f == "Down") {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.s
            }
        } else if (this.f == "Up") {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.s
            }
        }
        a = this.tail.shift()
        this.tail.push(newRect)
    }
}
class Apple {
    constructor() {
        var isTouching;
        while (true) {
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.s) * snake.s
            this.y = Math.floor(Math.random() * canvas.height / snake.s) * snake.s
            for (var i = 0; i < snake.tail.length; i++) {
                if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                    isTouching = true
                }
            }

            this.s = snake.s
            this.color = "red"
            if (!isTouching) {
                break;
            }
        }
    }
}
var canvas = document.getElementById("canvas")
var canvasContext = canvas.getContext('2d');
var snake = new Snake(0, 0, 20,"Down");
var apple = new Apple();

window.onload = () => {
        gameLoop(); 
}
function gameLoop() {
    setInterval(show, 1000 / 20) // here 15 is our fps value
}
function update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    snake.init()
    eatApple()
    checkHitWall();
}
function pausegame(){
if(pg.innerHTML=="Pause Game"){
    pg.innerHTML="Start"
   pg.onmouseover = function() {mouseOver()};
    pg.onmouseout = function() {mouseOut()};
    dd=false;
}else if(pg.innerHTML=="Start"){
    pg.innerHTML="Pause Game"
    pg.onmouseover = function() {mouseOver()};
    pg.onmouseout = function() {mouseOut()};
   dd=true;
}else if(pg.innerHTML=="Start game"){
    pg.innerHTML="Pause Game"
    pg.onmouseover = function() {mouseOver()};
    pg.onmouseout = function() {mouseOut()};
    snake = new Snake(0, 0, 20,"Down");
    apple=new Apple();
    ff=true;
}
}
function mouseOver() {
    document.getElementById("startgame").style.backgroundColor = "aliceblue";
  }
  
  function mouseOut() {
    document.getElementById("startgame").style.backgroundColor = "yellow";
  }
function show() {
    if(dd==true){
    if(ff==true){
    update();
    draw();}
    else{
        createRect(0, 0, canvas.width, canvas.height, "white")
         canvasContext.font = "50px Bold"
    canvasContext.fillStyle = "black"
    canvasContext.fillText("Game Over", canvas.width - 950, 300);
    canvasContext.fillText("Score: " + (snake.tail.length - 1),canvas.width - 920, 350);
    pg.innerHTML="Start game";
    }}
}
function checkHitWall() {
    var headTail = snake.tail[snake.tail.length - 1]
    if (headTail.x == -snake.s) {
        headTail.x = canvas.width - snake.s
        ff=false;
    } else if (headTail.x == canvas.width) {
        headTail.x = 0
        ff=false;
    } else if (headTail.y == -snake.s) {
        headTail.y = canvas.height - snake.s
        ff=false;
    } else if (headTail.y == canvas.height) {
        headTail.y = 0
        ff=false;
    }
}
function draw() {
    createRect(0, 0, canvas.width, canvas.height, "black")
    createRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < snake.tail.length; i++) {
        createRect(snake.tail[i].x+2.5, snake.tail[i].y+2.5,
            snake.s - 5, snake.s - 5, 'white')
    }
    createRect(apple.x, apple.y, apple.s, apple.s, apple.color)
    sc.innerHTML=`${snake.tail.length - 1}`
    // canvasContext.font = "20px Arial"
    // canvasContext.fillStyle = "#00FF42"
    // canvasContext.fillText("Score: " + (snake.tail.length - 1), canvas.width - 120, 18);
}
function eatApple() {
    if (snake.tail[snake.tail.length - 1].x == apple.x &&
        snake.tail[snake.tail.length - 1].y == apple.y) {
        snake.tail[snake.tail.length] = { x: apple.x, y: apple.y }
        apple = new Apple();
    }
}
function createRect(x, y, width, height, color) {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
}
window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        if (event.keyCode == 37) {
            snake.f="Left"
        } else if (event.keyCode == 38 ) {
            snake.f="Up"
        } else if (event.keyCode == 39 ) {
            snake.f="Right"
        } else if (event.keyCode == 40 ) {
            snake.f="Down"
        }
    }, 1)
})