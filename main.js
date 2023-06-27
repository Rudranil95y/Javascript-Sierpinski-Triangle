//const Point2d = require("Point2d");
//window.randInt = randInt;

class Point2d{
    constructor(x,y){
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
let height = (cv.height=window.innerHeight);
let width = (cv.width=window.innerWidth);


const ctx = cv.getContext("2d");

const a = new Point2d((width/2),70);
const b = new Point2d((width/2)+305.9956426705,600);
const c = new Point2d((width/2)-305.9956426705,600);


const vertices= [a,b,c];

var strtingPosition = new Point2d(width/2,500);
var animid , startedAnimation = false;
let currentPosition = strtingPosition;
let currentVertex,i=0;

//console.log(vertices[0].distance(vertices[1]));

//draws thee dots the the three triangle vertices and fills the dots with green color
{
    ctx.fillStyle = "rgba(0,0,0,1)";
    //ctx.beginPath();
    drawDot(vertices[0], 2);
    drawDot(vertices[1], 2);
    drawDot(vertices[2], 2);
    //drawDot(strtingPosition, 3);
    //drawDot(midPointOf(vertices[2], vertices[1]), 3);\
    addEventListener("keydown",(event)=>{
        if(startedAnimation === false){
            startedAnimation = true;
            Sierpiński(event);
        }
        else{
            cancelAnimationFrame(animid);
            startedAnimation = false;
        }

    });
    //Sierpiński();
    //ctx.fill();
}

function Sierpiński(e) {
    //let randomColor;

    //for (i = 0; i < 100; i++) {
        //randomColor = new Point2d(randInt(0,255),randInt(0,255),randInt(0,255));
        console.log("Vertices="+vertices);
        ctx.fillStyle = `rgba(${((randInt(0,5)/5)*255)},${((randInt(0,5)/5)*255)},${((randInt(0,5)/5)*255)},0.5)`;
        let randomVertex = randInt(0,2);
        currentVertex = vertices[randomVertex];
        console.log("random vertex:"+randomVertex);
        console.log("CurrentVertex: " + currentVertex);
        currentPosition = midPointOf(currentVertex, currentPosition);
        console.log("currentPos"+currentPosition);
        drawDot(currentPosition,1);
        animid = requestAnimationFrame(Sierpiński);
    //}
}

// function Sierpiński() {
//     let randomVertex = randInt(0, 2);
//     currentVertex = vertices[randomVertex];
//     currentPosition = midPointOf(currentVertex, currentPosition);
//     console.log(currentPosition);
//     drawDot(currentPosition,3);
//     if (i++ <= 1000000) {
//         Sierpiński();
//         //return;
//     }
    
//     //setTimeout(Sierpiński(), 1000);  
// }



function drawDot(position,size) {
    ctx.beginPath();
    ctx.arc(position.x,position.y,size,0,2*Math.PI,false);
    ctx.fill();
    //ctx.closePath();
}

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function midPointOf(point1, point2) {
    return point1.add(point2).divideScalar(2);
}