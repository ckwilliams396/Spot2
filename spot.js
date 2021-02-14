var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
canvas.addEventListener("click", function(event){
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    for(let i = 0; i < game.boardSize; i++){
        for(let j = 0; j< game.boardSize; j++){
            console.log("(" + i + "," + j + "): " + circles[i][j].contains(x,y));
            //TODO: setup logic for selecting and saving which dot is moving where 
        } 
    }
});

var game = new gameBoard();
var gridSize = (canvas.getBoundingClientRect().right/game.boardSize);
var radius = (gridSize/2 * 0.85);

var circles = new Array();
for(i=0; i<game.boardSize; i++){
    circles[i] = new Array();
}

for(i=0; i<circles.length; i++){
    for(j=0; j<circles.length; j++){
        let player = game.board[i][j].player;
        circles[i][j] = new circle(radius, (i * gridSize) + radius, (j * gridSize) + radius);
        circles[i][j].draw(context, player);
    }
}
