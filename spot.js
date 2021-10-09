var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var game = new gameBoard();
var gridSize = (canvas.getBoundingClientRect().right/game.boardSize);
var radius = (gridSize/2 * 0.85);
var circles = new Array();
var currentPlayer;
var fromX;
var fromY;

function  minimax(board, depth, maxPlayer, sum, move) {
    console.log("starting minimax: " + board.getTurn());
    if(move != null){
        board.moveToken(move.fromX, move.fromY, move.toX, move.toY);
        sum = sum + board.evaluteBoard();
    }

    console.log(board);
    if(depth === 0) {
        return [null, sum];
    }

    let possibleMoves = board.generateMoves(maxPlayer);
                
    let max = Number.NEGATIVE_INFINITY;
    let min = Number.POSITIVE_INFINITY;
    var bestMove;
    for(let i=0; i<possibleMoves.length; i++){
        let currentMove = possibleMoves[i];
        sum = sum + board.evaluteBoard();
        var [childBestMove, childValue] = minimax(board, depth -1, board.getTurn(), sum, currentMove)


        if(maxPlayer == gameBoard.player.PLAYER_TWO){
            if(childValue > max){
                max = childValue;
                bestMove = currentMove;
            }
        }
        else{
            if(childValue < min){
                min = childValue;
                bestMove = currentMove;
            }
        }
    }
    if(maxPlayer == gameBoard.player.PLAYER_TWO){
        return [bestMove, max];
    }else{
        return [bestMove, min];
    }
}


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
                   if(currentPlayer != gameBoard.player.EMPTY){
                        game.moveToken(fromX,fromY,i,j);
                   }
                   currentPlayer = null;
                   fromX = null;
                   fromY = null;
                   drawBoard();
                   displayTurn();
                   displayScore();
               }
               break;
           }
        } 
    }
    if(game.hasWinner()){
        alert("winner!");
    }
});

function displayTurn(){
    turn = game.getTurn();
    document.getElementById("turn").innerHTML = "Player's turn: " + (turn == gameBoard.player.PLAYER_ONE? "orange" : "blue");
}

function displayScore(){
    game.countTokens()
    let playerOneScore = game.getPlayerCount(gameBoard.player.PLAYER_ONE);
    let playerTwoScore = game.getPlayerCount(gameBoard.player.PLAYER_TWO);
    document.getElementById("score").innerHTML = "Orange: " + playerOneScore + " Blue: " + playerTwoScore;
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
console.log(minimax(game, 1, gameBoard.player.PLAYER_TWO, 0, null))
  