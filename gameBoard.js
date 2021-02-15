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
        this.board = new Array(this.boardSize).fill().map(b => {return new Array(this.boardSize).fill().map(a => {return new Token(gameBoard.player.EMPTY)})});
        this.board[0][0].setPlayer(gameBoard.player.PLAYER_ONE)
        this.board[this.boardSize-1][this.boardSize-1].setPlayer(gameBoard.player.PLAYER_ONE)
        this.board[0][this.boardSize-1].setPlayer(gameBoard.player.PLAYER_TWO)
        this.board[this.boardSize-1][0].setPlayer(gameBoard.player.PLAYER_TWO)
    }

    hasWinner(){
        // no empty spots available
        for(let i=0; i<this.boardSize; i++){
            for (let j=0; i<this.boardSize; j++){
                if(board[i][j].player == this.player.EMPTY) return false;
            }
        }
        return true;
        // Only one player has tokens on the board
    }

    isValidMove(fromX, fromY, toX, toY){
        let deltaX = Math.abs(toX - fromX);
        let deltaY = Math.abs(toY - fromY);
        let isSkipMove = deltaX == 2 || deltaY == 2;
        let isValidMove = deltaX + deltaY <= 4 && (deltaX <= 2 && deltaY <= 2) && this.board[toX][toY].getPlayer() == gameBoard.player.EMPTY;
        return {isSkipMove, isValidMove};
    }

    moveToken(fromX, fromY, toX, toY){
        // currentPlayer should be known!
        let currentPlayer = this.board[fromX][fromY].getPlayer();
        let {isValidMove, isSkipMove} = this.isValidMove(fromX, fromY, toX, toY);
        if(isValidMove){
            this.board[toX][toY].setPlayer(currentPlayer);
            isSkipMove && this.board[fromX][fromY].setPlayer(gameBoard.player.EMPTY);
            this.claim(toX,toY, currentPlayer);
            this.playerTurn
        } else {
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



