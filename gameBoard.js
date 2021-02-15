class gameBoard{
    boardSize = 7;
    static player = Object.freeze({
        PLAYER_ONE: "playerOne",
        PLAYER_TWO: "playerTwo",
        EMPTY: "empty"
    });
    board;
    playerTurn = gameBoard.player.PLAYER_ONE;

    constructor(){
        this.board = new Array(this.boardSize).fill(new Array(this.boardSize).fill(new Token(gameBoard.player.EMPTY)))
        this.board[0][0].setPlayer(player.PLAYER_ONE)
        this.board[this.boardSize-1][this.boardSize-1].setPlayer(player.PLAYER_ONE)
        this.board[0][this.boardSize-1].setPlayer(player.PLAYER_TWO)
        this.board[this.boardSize-1][0].setPlayer(player.PLAYER_TWO)
    }

    hasWinner(){
        let emptyCount = 0;
        for(let i=0; i<this.boardSize; i++){
            for (let j=0; i<this.boardSize; j++){
                if(board[i][j].player == this.player.EMPTY) return false;
            }
        }
        return true;
    }

    isValidMove(fromX, fromY, toX, toY){
        let deltaX = Math.abs(toX - fromX);
        let deltaY = Math.abs(toY - fromY);
        return deltaX + deltaY <= 3 && (deltaX <= 2 && deltaY <= 2);
    }

    isSkipMove(fromX, fromY, toX, toY){
        let deltaX = Math.abs(toX - fromX);
        let deltaY = Math.abs(toY - fromY);
        return deltaX == 2 || deltaY == 2;
    }


    moveToken(fromX, fromY, toX, toY){
        let currentPlayer = this.board[fromX][fromY].getPlayer();
        if(this.isValidMove(fromX, fromY, toX, toY)){
            this.board[toX][toY].setPlayer(currentPlayer);
            if(this.isSkipMove(fromX, fromY, toX, toY)){
                this.board[fromX][fromY].setPlayer(gameBoard.player.EMPTY);
            }
            this.claim(toX,toY, currentPlayer);
        }else{
            console.log("invalid move");
        }
    }

    claim(x, y, currentPlayer){
        let minX = (x == 0? 0 : x - 1); 
        let maxX = (x == this.boardSize-1? x : x + 1);
        let minY = (y == 0 ? 0 : y - 1);
        let maxY = (y == this.boardSize-1? y : y + 1);

        for(i = minX; i <= maxX; i++){
            for(j = minY; j <= maxY; j++){
                if(this.board[i][j].getPlayer() != gameBoard.player.EMPTY){
                    this.board[i][j].setPlayer(currentPlayer);
                }
            }
        }
    }


}



