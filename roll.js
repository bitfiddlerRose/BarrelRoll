
var blackGamePiece, whiteGamePiece;
var verticalWalls = [];
var horizontalWalls = [];
var tiles = [];
var LEVEL  = 0;
var ALERTED = false;


var whitebarrel_front = new Image();
var whitebarrel_side = new Image();
var whitebarrel_top = new Image();

var blackbarrel_front = new Image();
var blackbarrel_side = new Image();
var blackbarrel_top = new Image();    

blackbarrel_front.src = "images/blackbarrel_front.png";
blackbarrel_side.src = "images/blackbarrel_side.png";
blackbarrel_top.src = "images/blackbarrel_top.png";
whitebarrel_front.src = "images/barrel_front.png";
whitebarrel_side.src = "images/barrel_side.png";
whitebarrel_top.src = "images/barrel_top.png";

blackbarrel_front.addEventListener('load', onImageLoad);


function onImageLoad(e) {
     startGame();
};

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

function loadImage(src, callback) {
  var img = document.createElement('img');
  img.addEventListener('load', function() { callback(img); } , false);
  img.src = src;
}

function borders(horizontalWalls, verticalWalls, max_x, max_y, width)
{
    for (i=0;i<max_x;i++)
    {
        horizontalWalls.push(new wall(width,6,"black",i*width,-3));
        horizontalWalls.push(new wall(width,6,"black",i*width,max_y-3));
    }
    for (i=0;i<max_y;i++)
    {
        verticalWalls.push(new wall(6,width,"black",-3,i*width));
        verticalWalls.push(new wall(6,width,"black",max_x-3,i*width));
    }
}

function levelOne() {
    for (i=0; i<4; i++){
        for (j=0; j<4; j++) {
            var tile = new component(100,100,"grey",i*100,j*100);
            tiles.push(tile);
        }
    }
    black_images = [blackbarrel_front, blackbarrel_side, blackbarrel_top];
    white_images = [whitebarrel_front, whitebarrel_side, whitebarrel_top];
    blackGamePiece = new sprite(90,90,"black",5,5,black_images,"TOP");
    whiteGamePiece = new sprite(90,90,"white",105,105, white_images,"TOP");
    verticalWalls.push(new wall(6,100,"red",197,0));
    verticalWalls.push(new wall(6,100,"red",197,100));
    verticalWalls.push(new wall(6,100,"red",97,200));
    verticalWalls.push(new wall(6,100,"red",297,0));

    horizontalWalls.push(new wall(100,6,"red",100,197));
    horizontalWalls.push(new wall(100,6,"red",100,297));
    horizontalWalls.push(new wall(100,6,"red",200,297));
    horizontalWalls.push(new wall(100,6,"red",300,197));

    borders(horizontalWalls, verticalWalls, 400, 400, 100);
    goalSquare = new component(100,100,"green",300,0,"*");
}

function win(level) {
    var win_messages = [];
    win_messages.push("GREAT JOB NICE ROLL!");
    win_messages.push("YOU DID RIGHT AGAIN!");
    win_messages.push("YES THAT WAS SURE IT!");
    win_messages.push("YOU WIN NOW SOLVE IT!");
    alert(win_messages[level]);
}

function startGame() {
    myGameArea.start();
    levelOne();
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

function wall(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}

function sprite(width, height, color, x, y, images, orientation) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.images = {};
    this.images["FRONT"] = images[0];
    this.images["SIDE"] = images[1];
    this.images["TOP"] = images[2];
    this.orientation = orientation;
    this.direction = "";
    this.image = this.images[this.orientation];

    this.update = function() {
        ctx = myGameArea.context;
        if (this.image) {
            ctx.drawImage(this.image,this.x+width/4,this.y+height/4);
        }
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        if ((this.x + this.speedX >= 0) &&
            (this.x + this.speedX <= 400) &&
            (this.y + this.speedY >= 0) &&
            (this.y + this.speedY <= 400))
        {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }
    this.oldPos = function() {
        this.x -= this.speedX;
        this.y -= this.speedY;
    }
    this.hitWall = function(walls) {
        crash = false;
        for (i=0;i<walls.length;i++){
            var wall = walls[i];
            if (this.direction == "left") {
                if ((this.y-5 == wall.y) && (this.x > wall.x) && (this.x + this.speedX < wall.x))
                {
                    crash=true;
                }
            }
            if (this.direction == "right") { 
                if ((this.y-5 == wall.y) && (this.x < wall.x) && (this.x + this.speedX > wall.x)) 
                {
                    crash = true;
                }
            }
            if (this.direction == "up") {
                if ((this.y > wall.y) &&  (this.y + this.speedY < wall.y) && (this.x-5 == wall.x))
                {
                    crash = true;
                }
            }
            if (this.direction == "down") {
                if ((this.y < wall.y) &&  (this.y + this.speedY > wall.y) && (this.x-5 == wall.x))
                {
                    crash = true;
                }
            }
    }
        return crash;
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
    }
    this.setOrientation = function()
    {
        if (this.orientation == "TOP")
        {
            if ( (this.direction == "up") || (this.direction == "down"))
            {
                this.orientation = "FRONT";
            }
            else if ( (this.direction == "right") || (this.direction == "left"))
            {
                this.orientation = "SIDE";
            }
            this.direction = "";
            this.speedX = 0;
            this.speedY = 0;
        }
        else if (this.orientation == "FRONT")
        {
            if ( (this.direction == "up") || (this.direction == "down") )
            {
                this.orientation = "TOP";
                this.direction = "";
                this.speedX = 0;
                this.speedY = 0;
            }
        }
        else if (this.orientation == "SIDE") 
        {
            if ( (this.direction == "right") || (this.direction == "left") )
            {
                this.orientation = "TOP";
                this.direction = "";
                this.speedX = 0;
                this.speedY = 0;
            }
        }
        this.image = this.images[this.orientation];
    }
}

function updateBarrels(blackGamePiece, whiteGamePiece, horizontalWalls, verticalWalls)
{
    var count = 0;
    while ((count < 6) && ((blackGamePiece.direction) || (whiteGamePiece.direction)))
    {
        console.log("count = ",count);
        console.log("black direction = ",blackGamePiece.direction);
        console.log("white direction = ",whiteGamePiece.direction);
        if (blackGamePiece.hitWall(verticalWalls) || blackGamePiece.hitWall(horizontalWalls))
        {
            blackGamePiece.speedX = 0;
            blackGamePiece.speedY = 0;
            blackGamePiece.direction = "";
        }
        if ((whiteGamePiece.hitWall(verticalWalls)) || whiteGamePiece.hitWall(horizontalWalls))
        {
            whiteGamePiece.speedX = 0;
            whiteGamePiece.speedY = 0;
            whiteGamePiece.direction = "";
        }

        updateBarrelsOnce(blackGamePiece, whiteGamePiece);

        count++;
        console.log("black direction = ",blackGamePiece.direction);
        console.log("white direction = ",whiteGamePiece.direction);

    }
}

function updateBarrelsOnce(blackGamePiece, whiteGamePiece){
    blackGamePiece.newPos();
    if (blackGamePiece.crashWith(whiteGamePiece)) {
        whiteGamePiece.newPos();
        whiteGamePiece.setOrientation();
        whiteGamePiece.update();
        if (blackGamePiece.crashWith(whiteGamePiece)) {
            blackGamePiece.oldPos();
            blackGamePiece.direction = "";
            blackGamePiece.speedX = 0;
            blackGamePiece.speedY = 0;
        }
        else {
            blackGamePiece.setOrientation();
        }
        blackGamePiece.update();
    }
    else {
        blackGamePiece.setOrientation();
        blackGamePiece.update();
        whiteGamePiece.newPos();
        if (whiteGamePiece.crashWith(blackGamePiece)) {
            whiteGamePiece.oldPos();
            whiteGamePiece.direction = "";
            whiteGamePiece.speedX = 0;
            whiteGamePiece.speedY = 0;
        }
        else {
            whiteGamePiece.setOrientation();
        }
        whiteGamePiece.update();
    }
}

function updateGameArea() {
    myGameArea.clear();
    // Alert if we won
    if ((blackGamePiece.x-5 == goalSquare.x) && (blackGamePiece.y-5==goalSquare.y) && !ALERTED)
    {
        win(LEVEL);
        ALERTED = true;
    }
    // Redraw the background things
    for (i=0; i<tiles.length;i++) {
        tiles[i].update();
    }
    goalSquare.update();
    for (i=0;i<verticalWalls.length;i++) {
        verticalWalls[i].update();
    }
    for (i=0;i<horizontalWalls.length;i++) {
        horizontalWalls[i].update();
    }

    // Redraw the sprites
    var direction = "";
    blackGamePiece.speedX = 0;
    blackGamePiece.speedY = 0;
    whiteGamePiece.speedX = 0;
    whiteGamePiece.speedY = 0;
    if (myGameArea.key) {
        if (myGameArea.key == 37)  // left
        {
            blackGamePiece.speedX = -100;
            whiteGamePiece.speedX = -100;
            blackGamePiece.direction = "left"
            whiteGamePiece.direction = "left"

        }
        else if (myGameArea.key == 39)  // right
        {
            blackGamePiece.speedX = 100;
            whiteGamePiece.speedX = 100;
            blackGamePiece.direction = "right";
            whiteGamePiece.direction = "right";
        }
        else if (myGameArea.key == 38)  // up
        {
            blackGamePiece.speedY = -100;
            whiteGamePiece.speedY = -100;
            blackGamePiece.direction = "up";
            whiteGamePiece.direction = "up";
        }
        else if (myGameArea.key == 40)  // down
        {
            blackGamePiece.speedY = 100;
            whiteGamePiece.speedY = 100;
            blackGamePiece.direction = "down";
            whiteGamePiece.direction = "down";
        }

    updateBarrels(blackGamePiece, whiteGamePiece, horizontalWalls, verticalWalls);
    myGameArea.key = false;
    }
    blackGamePiece.update();
    whiteGamePiece.update();
    
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        myGameArea.key = false;

        window.addEventListener('keyup', function (e) {
            myGameArea.key = e.keyCode;
        })
    },

    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}