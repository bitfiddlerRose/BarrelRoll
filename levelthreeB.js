$.getScript('roll.js', function()
{
    blackbarrel_front.addEventListener('load', onImageLoad);

    function onImageLoad(e)
    {
        startGame();
    };

    function startGame()
    {
        myGameArea.start();
        loadLevel();
    }

    function loadLevel() {

        makeBackground();
        makeImages();
        blackGamePiece.x = 205;
        blackGamePiece.y = 305;
        whiteGamePiece.x = 105;
        whiteGamePiece.y = 305;

        verticalWalls.push(new wall(6,100,"brown",97,100));
        verticalWalls.push(new wall(6,100,"brown",97,200));
        verticalWalls.push(new wall(6,100,"brown",197,300));
        verticalWalls.push(new wall(6,100,"brown",297,100));
        verticalWalls.push(new wall(6,100,"brown",297,200));

        horizontalWalls.push(new wall(100,6,"brown",100,297));
        horizontalWalls.push(new wall(100,6,"brown",200,297));

        borders(horizontalWalls, verticalWalls, 400, 400, 100);
        goalSquare = new component(100,100,"green",100,300);
        hole = new hole(25,100,300);
        setupCounter(13);
    }
});