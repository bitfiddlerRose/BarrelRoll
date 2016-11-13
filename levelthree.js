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
        blackGamePiece.y = 105;
        whiteGamePiece.x = 305;
        whiteGamePiece.y = 105;

        verticalWalls.push(new wall(6,100,"brown",97,200));

        borders(horizontalWalls, verticalWalls, 400, 400, 100);
        goalSquare = new component(100,100,"green",300,0);
        hole = new hole(25,300,0);
        setupCounter(10);
    }
});