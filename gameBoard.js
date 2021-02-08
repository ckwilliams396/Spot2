class gameBoard{
    boardSize = 7;
    board;
    player = Object.freeze(player = {
        PLAYER_ONE: "playerOne",
        PLAYER_TWO: "playerTwo",
        EMPTY: "empty"
    });

    constructor(){
        board = new Array();
        for(i=0; i<this.boardSize; i++){
            board[i] = new Array();
        }
        for(i=0; i<this.boardSize; i++){
            for(j=0; j<this.boardSize; j++){
                if((i==0 && j==0)  || (i==this.boardSize-1 && j==this.boardSize-1)){
                    board[i][j] = new Token(player.PLAYER_ONE);
                }else if((i==0 && j==this.boardSize-1)  || (i ==this.boardSize-1 && j==0)){
                    board[i][j] = new Token(player.PLAYER_TWO);
                }else{
                    board[i][j] = new Token(player.EMPTY);
                }
            }
        }
    }

    hasWinner(){
        let emptyCount = 0;
        for(i=0; i<this.boardSize; i++){
            for (j=0; i<this.boardSize; j++){
                if(board[i][j].player == this.player.EMPTY){
                    emptyCount++
                }
            }
        }
        return emptyCount == 0;
    }

    isValidMove(fromX, fromY, toX, toY){
        let deltaX = Math.abs(toX - fromX);
        let deltaY = Math.abs(toY - fromY);
        if(deltaX + deltaY <= 3 && (deltaX <= 2 && deltaY <= 2)){
            return true;
        }
        else{
            return false;
        }
    }

    moveToken(fromX, fromY, toX, toY){
        let currentPlayer = this.board[fromX][fromY].player;
        if(this.isValidMove(fromX, fromY, toX, toY)){
            this.board[toX][toY].setPlayer(currentPlayer);
        }
    }
}



