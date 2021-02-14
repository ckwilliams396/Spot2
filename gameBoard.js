class gameBoard{
    boardSize = 7;
    static player = Object.freeze({
        PLAYER_ONE: "playerOne",
        PLAYER_TWO: "playerTwo",
        EMPTY: "empty"
    });
    board;

    constructor(){
        this.board = new Array();
        for(let i=0; i<this.boardSize; i++){
            this.board[i] = new Array();
        }
        for(let i=0; i<this.boardSize; i++){
            for(let j=0; j<this.boardSize; j++){
                if((i==0 && j==0)  || (i==this.boardSize-1 && j==this.boardSize-1)){
                    this.board[i][j] = new Token(gameBoard.player.PLAYER_ONE);
                }else if((i==0 && j==this.boardSize-1)  || (i ==this.boardSize-1 && j==0)){
                    this.board[i][j] = new Token(gameBoard.player.PLAYER_TWO);
                }else{
                    this.board[i][j] = new Token(gameBoard.player.EMPTY);
                }
            }
        }
    }

    hasWinner(){
        let emptyCount = 0;
        for(let i=0; i<this.boardSize; i++){
            for (let j=0; i<this.boardSize; j++){
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



