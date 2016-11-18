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
        blackGamePiece.x = 105;
        blackGamePiece.y = 205;
        whiteGamePiece.x = 105;
        whiteGamePiece.y = 5;

        verticalWalls.push(new wall(6,100,"brown",97,200));
        verticalWalls.push(new wall(6,100,"brown",197,200));
        verticalWalls.push(new wall(6,100,"brown",297,200));

        horizontalWalls.push(new wall(100,6,"brown",100,97));
        horizontalWalls.push(new wall(100,6,"brown",200,97));
        horizontalWalls.push(new wall(100,6,"brown",100,197));
        horizontalWalls.push(new wall(100,6,"brown",200,297));

        borders(horizontalWalls, verticalWalls, 400, 400, 100);
        goalSquare = new component(100,100,"green",200,200);
        hole = new hole(25,200,200)
        setupCounter(10);
    }
});