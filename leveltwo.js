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
        blackGamePiece.y = 305;
        whiteGamePiece.x = 5;
        whiteGamePiece.y = 5;

        verticalWalls.push(new wall(6,100,"brown",97,300));

        horizontalWalls.push(new wall(100,6,"brown",0,197));
        horizontalWalls.push(new wall(100,6,"brown",300,197));
        horizontalWalls.push(new wall(100,6,"brown",300,297));

        borders(horizontalWalls, verticalWalls, 400, 400, 100);
        goalSquare = new component(100,100,"green",300,300);
        setupCounter(9);
    }
});