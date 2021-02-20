class gameBoard{
    boardSize = 7;
    playerOneCount = 2;
    playerTwoCount = 2;
    emptyCount;
    static player = Object.freeze({
        PLAYER_ONE: "playerOne",
        PLAYER_TWO: "playerTwo",
        EMPTY: "empty"
    });
    board;
    playerTurn = gameBoard.player.PLAYER_ONE;

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
        return this.emptyCount == 0 || this.playerOneCount == 0 || this.playerTwoCount == 0;
    }

    isValidMove(fromX, fromY, toX, toY){
        let deltaX = Math.abs(toX - fromX);
        let deltaY = Math.abs(toY - fromY);
        return deltaX + deltaY <= 4 && (deltaX <= 2 && deltaY <= 2) && this.board[toX][toY].getPlayer() == gameBoard.player.EMPTY;
    }

    isSkipMove(fromX, fromY, toX, toY){
        let deltaX = Math.abs(toX - fromX);
        let deltaY = Math.abs(toY - fromY);
        return deltaX == 2 || deltaY == 2;
    }


    moveToken(fromX, fromY, toX, toY){
        let currentPlayer = this.board[fromX][fromY].getPlayer();
        if(currentPlayer == this.playerTurn){
            if(this.isValidMove(fromX, fromY, toX, toY)){
                this.board[toX][toY].setPlayer(currentPlayer);
                if(this.isSkipMove(fromX, fromY, toX, toY)){
                    this.board[fromX][fromY].setPlayer(gameBoard.player.EMPTY);
                }
                this.claim(toX,toY, currentPlayer);
                this.playerTurn = this.changeTurn(this.playerTurn);
            }else{
                console.log("invalid move");
            }
        }else{
            console.log("Its not your turn...");
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

    changeTurn(player){
        if(player == gameBoard.player.PLAYER_ONE){
            return gameBoard.player.PLAYER_TWO;
        }else if(player == gameBoard.player.PLAYER_TWO){
            return gameBoard.player.PLAYER_ONE;
        }
    }

    getTurn(){
        return this.playerTurn;
    }

    setPlayerCount(player, count){
        if(player == gameBoard.player.PLAYER_ONE){
            this.playerOneCount = count;
        }else if(player == gameBoard.player.PLAYER_TWO){
            this.playerTwoCount = count;
        }else{
            this.emptyCount = count;
        }
    }
    getPlayerCount(player){
        return player == gameBoard.player.PLAYER_ONE ? this.playerOneCount : this.playerTwoCount;
    }

    countTokens(){
        let emptyCount = 0;
        let playerOne = 0;
        let playerTwo = 0;
        for(let i=0; i<this.boardSize; i++){
            for (let j=0; j<this.boardSize; j++){
                console.log(i+","+j);
                let currentPlayer = this.board[i][j].getPlayer();
                console.log(currentPlayer);
                if(currentPlayer == gameBoard.player.PLAYER_ONE){
                    playerOne++;
                }else if(currentPlayer == gameBoard.player.PLAYER_TWO){
                    playerTwo++;
                }else{
                    emptyCount++;
                }
            }
        }
        this.setPlayerCount(gameBoard.player.PLAYER_ONE, playerOne);
        this.setPlayerCount(gameBoard.player.PLAYER_TWO, playerTwo);
        this.setPlayerCount(gameBoard.player.EMPTY, emptyCount);
    }

}



