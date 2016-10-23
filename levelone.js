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
        makeBackground();
        makeImages();
        loadLevel();
    }

    function loadLevel() 
    {
        blackGamePiece.x = 5;
        blackGamePiece.y = 105;
        whiteGamePiece.x = 205;
        whiteGamePiece.y = 305;
        verticalWalls.push(new wall(6,100,"brown",197,100));

        horizontalWalls.push(new wall(100,6,"brown",200,297));

        borders(horizontalWalls, verticalWalls, 400, 400, 100);
        goalSquare = new component(100,100,"green",200,100);
        setupCounter(5);
    }
});
