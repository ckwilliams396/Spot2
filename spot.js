function circle(x, y){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.fill();
}

var width = document.getElementById("myCanvas").width;
var height = document.getElementById("myCanvas").height;

console.log(width+"x"+height);
for(i=25; i<width; i+=75){
    for(j=25; j<height; j+=75){
        circle(i, j);
    }
}
    