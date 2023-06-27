
class Point2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(point) {
        let p = new Point2d(this.x, this.y);
        p.x += point.x;
        p.y += point.y;
        return p;
    }

    divideScalar(num) {
        let p = new Point2d(this.x, this.y);
        p.x /= num;
        p.y /= num;
        return p;
    }
}


const cv = document.querySelector("canvas");
let height = (cv.height = window.innerHeight);
let width = (cv.width = window.innerWidth);


const ctx = cv.getContext("2d");

const a = new Point2d((width / 2), 70);
const b = new Point2d((width / 2) + 305.9956426705, 600);
const c = new Point2d((width / 2) - 305.9956426705, 600);


const vertices = [a, b, c];

var strtingPosition = new Point2d(width / 2, 500);
var animid, startedAnimation = false;
let currentPosition = strtingPosition;
let currentVertex, i = 0;


//draws thee dots of the three triangle vertices and 
//and if a key is pressed it starts the animation of
//drawing the dots to fill the Sierpinski triangle.
ctx.fillStyle = "rgba(0,0,0,1)";
drawDot(vertices[0], 2);
drawDot(vertices[1], 2);
drawDot(vertices[2], 2);
addEventListener("keydown", (event) => {
    if (startedAnimation === false) {
        startedAnimation = true;
        Sierpiński(event);
    }
    else {
        cancelAnimationFrame(animid);
        startedAnimation = false;
    }

});



//This is the function that calculates the position of the dots
//of the Sierpinski Triangle and draws a single dot at the 
//calculated position. This function is called above when a
//key is pressed and thus it draws single dot in a single 
//animation frame. 

function Sierpiński(e) {
    console.log("Vertices=" + vertices);
    ctx.fillStyle = `rgba(${((randInt(0, 5) / 5) * 255)},${((randInt(0, 5) / 5) * 255)},${((randInt(0, 5) / 5) * 255)},0.5)`;
    let randomVertex = randInt(0, 2);
    currentVertex = vertices[randomVertex];
    console.log("random vertex:" + randomVertex);
    console.log("CurrentVertex: " + currentVertex);
    currentPosition = midPointOf(currentVertex, currentPosition);
    console.log("currentPos" + currentPosition);
    drawDot(currentPosition, 1);
    animid = requestAnimationFrame(Sierpiński);

}



function drawDot(position, size) {
    ctx.beginPath();
    ctx.arc(position.x, position.y, size, 0, 2 * Math.PI, false);
    ctx.fill();
}

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function midPointOf(point1, point2) {
    return point1.add(point2).divideScalar(2);
}