var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var game = new gameBoard();
var gridSize = (canvas.getBoundingClientRect().right/game.boardSize);
var radius = (gridSize/2 * 0.85);
var circles = new Array();
var currentPlayer;
var fromX;
var fromY;


canvas.addEventListener("click", function(event){
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    for(let i = 0; i < game.boardSize; i++){
        for(let j = 0; j< game.boardSize; j++){
           if(circles[i][j].contains(x,y)){
               if(currentPlayer == null){
                   circles[i][j].drawSelected(context);
                   currentPlayer = game.board[i][j].getPlayer();
                   fromX = i;
                   fromY = j;
               }else{
                   //implement logic to prevent peices being changed from same place clicking
                   if(currentPlayer != gameBoard.player.EMPTY){
                        game.moveToken(fromX,fromY,i,j);
                   }
                   currentPlayer = null;
                   fromX = null;
                   fromY = null;
                   drawBoard();
                   setTurn();
               }
               
           }
        } 
    }
});

function setTurn(){
    turn = game.getTurn();
    document.getElementById("turn").innerHTML = "Player's turn: " + (turn == gameBoard.player.PLAYER_ONE? "orange" : "blue");
}
for(i=0; i<game.boardSize; i++){
    circles[i] = new Array();
}

function drawBoard(){
    for(i=0; i<circles.length; i++){
        for(j=0; j<circles.length; j++){
            let player = game.board[i][j].getPlayer();
            circles[i][j] = new circle(radius, (i * gridSize) + radius, (j * gridSize) + radius);
            circles[i][j].draw(context, player);
        }
    }   
}

drawBoard();
  