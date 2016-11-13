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
        blackGamePiece.y = 105;
        whiteGamePiece.x = 205;
        whiteGamePiece.y = 105;

        verticalWalls.push(new wall(6,100,"brown", 97,100));
        verticalWalls.push(new wall(6,100,"brown", 97,200));
        verticalWalls.push(new wall(6,100,"brown",297,100));
        verticalWalls.push(new wall(6,100,"brown",197,200));

        horizontalWalls.push(new wall(100,6,"brown",100,97));
        horizontalWalls.push(new wall(100,6,"brown",200,97));
        horizontalWalls.push(new wall(100,6,"brown",200,197));
        horizontalWalls.push(new wall(100,6,"brown",200,297));

        borders(horizontalWalls, verticalWalls, 400, 400, 100);
        goalSquare = new component(100,100,"green",200,200);
        hole = new hole(25,200,200);
        setupCounter(22);
    }
});