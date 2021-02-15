class circle{
    radius;
    x;
    y;

    constructor(radius,x,y){
        this.radius = radius;
        this.x = x;
        this.y = y;
    }


    contains(x,y){
        return Math.sqrt(Math.pow((x - this.x), 2) + Math.pow((y - this.y), 2)) < this.radius;
    }

    draw(context, player){
        context.lineWidth = 1;
        context.beginPath();
        context.arc(this.x,this.y,this.radius, 0, 2* Math.PI);
        context.stroke();
        if(player == gameBoard.player.PLAYER_ONE){
            context.fillStyle = "orange";
            context.fill();
        }else if(player == gameBoard.player.PLAYER_TWO){
            context.fillStyle = "blue";
            context.fill();
        }else{
            context.fillStyle = "white";
            context.fill();
            context.stroke();
        }
    }

    drawSelected(context){
        context.lineWidth = 3;
        context.beginPath();
        context.arc(this.x,this.y,this.radius, 0, 2* Math.PI);
        context.stroke(); 
    }
}