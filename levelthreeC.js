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
        blackGamePiece.x = 5;
        blackGamePiece.y = 5;
        whiteGamePiece.x = 305;
        whiteGamePiece.y = 305;

        verticalWalls.push(new wall(6,100,"brown",97,0));
        verticalWalls.push(new wall(6,100,"brown",97,200));
        verticalWalls.push(new wall(6,100,"brown",297,100));
        verticalWalls.push(new wall(6,100,"brown",297,300));

        borders(horizontalWalls, verticalWalls, 400, 400, 100);
        goalSquare = new component(100,100,"green",200,100);
        hole = new hole(25,200,100);
        setupCounter(7);
    }
});