
var blackGamePiece, whiteGamePiece;
var verticalWalls = [];
var horizontalWalls = [];
var tiles = [];
var ALERTED = false;

var moveTitle;
var moveCounter;

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

function setupCounter(max_moves)
{
    moveTitle = new textHolder(200,100,"brown",400,0, "Moves Remaining");
    moveCounter = new moves(200,300,"darksalmon",400,100,max_moves)
}


function makeBackground() 
{
    for (i=0; i<4; i++)
    {
        for (j=0; j<4; j++)
        {
            var tile = new component(100,100,"grey",i*100,j*100);
            tiles.push(tile);
        }
    }
}

function makeImages()
{
    black_images = [blackbarrel_front, blackbarrel_side, blackbarrel_top];
    white_images = [whitebarrel_front, whitebarrel_side, whitebarrel_top];
    blackGamePiece = new sprite(90,90,"black",0,0,black_images,"TOP");
    whiteGamePiece = new sprite(90,90,"white",0,0, white_images,"TOP");

}


function win() {
    if (moveCounter.zero)
    {
        if (blackGamePiece.orientation == 'TOP')
        {
            // Win
            $("#perfectModal").modal('show');
        }
        else
        {
            // Fail - wrong orientation
            $("#loseModal").modal('show');
        }
    }
    else if (!moveCounter.positive)
    {
        // Win, but too many moves
        $("#winModal").modal('show');
    }
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

function textHolder(width, height, color, x, y, text) {
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
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        var words = text.split(" ");
        for(i=0; i<words.length;i++)
        {
            ctx.fillText(words[i],this.x+100,this.y+(40*(i+1)));
        }
    }
}

function moves(width, height, color, x, y, max_moves) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.moves_remaining = max_moves;
    this.positive = true;
    this.zero = false;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.font = "120px Arial";
        ctx.textAlign="center";
        ctx.fillText(this.moves_remaining, this.x+100, this.y+190);
    }
    this.move = function() {
        if (this.moves_remaining > 1)
        {
            this.moves_remaining--;
        }
        else if (this.moves_remaining == 1)
        {
            this.moves_remaining--;
            this.zero = true;
        }
        else
        {
            this.positive = false;
            this.zero = false;
        }
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
    var moved, white_moved, black_moved, count;
    moved = false;
    count=0;
    while (count < 6 && ((blackGamePiece.direction) || (whiteGamePiece.direction)))
    {
        if (blackGamePiece.hitWall(verticalWalls) || blackGamePiece.hitWall(horizontalWalls))
        {
            blackGamePiece.speedX = 0;
            blackGamePiece.speedY = 0;
            blackGamePiece.direction = "";
        }

        black_moved = !(blackGamePiece.speedX == 0 && blackGamePiece.speedY == 0);

        if ((whiteGamePiece.hitWall(verticalWalls)) || whiteGamePiece.hitWall(horizontalWalls))
        {
            whiteGamePiece.speedX = 0;
            whiteGamePiece.speedY = 0;
            whiteGamePiece.direction = "";
        }

        white_moved = !(whiteGamePiece.speedX == 0 && whiteGamePiece.speedY == 0);

        if (black_moved || white_moved)
        {
            moved = updateBarrelsOnce(blackGamePiece, whiteGamePiece, black_moved, white_moved) || moved;
        }
        count++;
    }
    return moved;
}

function updateBarrelsOnce(blackGamePiece, whiteGamePiece, black_moved, white_moved)
{
    if (black_moved)
    {
        blackGamePiece.newPos();
        if (white_moved)
        {
            whiteGamePiece.newPos();
            whiteGamePiece.setOrientation();
            whiteGamePiece.update();
            if (blackGamePiece.crashWith(whiteGamePiece)) {
                blackGamePiece.oldPos();
                blackGamePiece.direction = "";
                blackGamePiece.speedX = 0;
                blackGamePiece.speedY = 0;
                black_moved = false;
            }
            else {
                blackGamePiece.setOrientation();
            }
            blackGamePiece.update();
        }
        else
        {
            if (blackGamePiece.crashWith(whiteGamePiece)) {
                blackGamePiece.oldPos();
                blackGamePiece.direction = "";
                blackGamePiece.speedX = 0;
                blackGamePiece.speedY = 0;
                black_moved = false;
            }
            else {
                blackGamePiece.setOrientation();
            }
            blackGamePiece.update();
        }        
    }
    else 
    {
        whiteGamePiece.newPos();
        if (whiteGamePiece.crashWith(blackGamePiece)) {
            whiteGamePiece.oldPos();
            whiteGamePiece.direction = "";
            whiteGamePiece.speedX = 0;
            whiteGamePiece.speedY = 0;
            white_moved = false;
        }
        else {
            whiteGamePiece.setOrientation();
        }
        whiteGamePiece.update();
    }
    return (white_moved || black_moved)
}



function updateGameArea() {
    myGameArea.clear();
    // Alert if we won
    if ((blackGamePiece.x-5 == goalSquare.x) && 
        (blackGamePiece.y-5==goalSquare.y) && 
        !ALERTED)
    {
        win();
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
    moveTitle.update();
    moveCounter.update();

    // Redraw the sprites
    var direction = "";
    var moved = false;
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

        moved = updateBarrels(blackGamePiece, whiteGamePiece, horizontalWalls, verticalWalls);
        if (moved)
        {
            moveCounter.move();
        }
        myGameArea.key = false;
    }
    blackGamePiece.update();
    whiteGamePiece.update();
    
}


var myGameArea = {
    canvas : $("myCanvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.context = $("#myCanvas")[0].getContext('2d');
        this.canvas.insertBefore(document.body.childNodes[0]);
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

$('.menubutton').click(function() {
    console.log("Clicked Menu");
    window.location ='index.html';
});

$('.retrybutton').click(function() {
    console.log("Clicked Retry");
});

$('.modal_footer a.action').on('click', function(event) {
    var action = $(this).data('data-action');
    if (action=='menu')
    {
        $("#winModal").modal('hide');
        window.location = "index.html";
    }
    else if (action=='retry')
    {
        $("#winModal").modal('hide');
        startGame();
    }
    else if (action=='next')
    {
        $("#winModal").modal('hide');
        $('#document').load('barrel.html');
    }

});

$('myCanvas').on('swipedown', function() {

    blackGamePiece.speedY = 100;
    whiteGamePiece.speedY = 100;
    blackGamePiece.direction = "down";
    whiteGamePiece.direction = "down";

    moved = updateBarrels(blackGamePiece, whiteGamePiece, horizontalWalls, verticalWalls);
    if (moved)
    {
        moveCounter.move();
    }
});
