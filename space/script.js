window.onload = function() {
    canv = document.getElementById("gc");
    canv.height = innerHeight - 18;
    canv.width = innerWidth - 18;
    ctx = canv.getContext("2d");
    document.addEventListener("mousedown",mouseDown);
    document.addEventListener("mousemove",mouseMove);
    document.addEventListener("mouseup",mouseUp);
    document.addEventListener("wheel",scrollWheel);
    setInterval(game, 30);
}

let earthTxt = new Image();
earthTxt.src = "res/earth.png";

let marsTxt = new Image();
marsTxt.src = "res/mars.png";

let starTxt = new Image();
starTxt.src = "res/star.png";

let rocketpic = new Image();
rocketpic.src = "res/rocket-no-flame.png";

const allImgs = [earthTxt, marsTxt, starTxt];

let upPress = false;
let leftPress = false;
let rightPress = false;

class Planet {
    constructor(x, y, diameter, speedX, speedY, mass, texture) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.speedX = speedX;
        this.speedY = speedY;
        this.mass = mass;
        this.texture = texture;
    }

    draw(scaleVector) {
        ctx.translate(canv.width / 2, canv.height / 2);
        ctx.scale(1/scaleVector, 1/scaleVector);
        ctx.translate(-canv.width / 2, -canv.height / 2);
        ctx.drawImage(this.texture, this.x + offset.x, this.y + offset.y, this.diameter, this.diameter);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    update() {
        this.x+=this.speedX;
        this.y+=this.speedY;
    }
}
let offset = {
    x: 0,
    y: 0
}
let mouse = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
}

let middlePress = false;
let mousePress = false;

let scaleVector = 1;

let planets = [];

let hole = new Planet(1184, 300, 70, 0.0, 0.0, 12.0, earthTxt);
let fart = new Planet(70, 300, 40, 0.0, 0.0, 3.4, marsTxt);
planets.push(hole);
planets.push(fart);
function game() {
    calcGrav(fart, hole);
    planets.forEach(planet => {
        planets.forEach(planet2 => {
            calcGrav(planet, planet2);
        });
        planet.update();
    });

    draw();
}


function draw() {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.fillRect(0, 0, canv.width, canv.height);

    planets.forEach(planet => {
        planet.draw(scaleVector);
    });

    if (mousePress) {
        ctx.beginPath();
        ctx.moveTo(mouse.x1 - canv.getBoundingClientRect().left, mouse.y1 - canv.getBoundingClientRect().top);    // Move the pen to (30, 50)
        ctx.lineTo(mouse.x2 - canv.getBoundingClientRect().left, mouse.y2 - canv.getBoundingClientRect().top);  // Draw a line to (150, 100)
        ctx.closePath();
        ctx.stroke();
    }

    if (middlePress) {
        offset.x += mouse.x2 - mouse.x1;
        offset.y += mouse.y2 - mouse.y1;
    }
}

function newGame() {
    player.speedX = 0.0;
    player.speedY = 0.0;
    
    player.x = Math.floor(Math.random() * (canv.width - player.width));
    player.y = Math.floor(Math.random() * (canv.height - player.height));
    
    hole.x = Math.floor(Math.random() * (canv.width - hole.diameter));
    hole.y = Math.floor(Math.random() * (canv.height - hole.diameter));
}

function calcGrav(obj1, obj2) {
    obj1.speedX += Math.cos(Math.atan2((obj2.diameter/2 + obj2.y) - (obj1.diameter/2 + obj1.y), (obj2.diameter/2 + obj2.x) - (obj1.diameter/2 + obj1.x))) * ((obj2.mass * obj1.mass) * 5000 / (((obj2.diameter/2 + obj2.x) * Math.abs(obj2.diameter/2 + obj2.x)) + ((obj2.diameter/2 + obj2.y) * Math.abs(obj2.diameter/2 + obj2.y))));

    obj1.speedY += Math.sin(Math.atan2((obj2.diameter/2 + obj2.y) - (obj1.diameter/2 + obj1.y), (obj2.diameter/2 + obj2.x) - (obj1.diameter/2 + obj1.x))) * ((obj2.mass * obj1.mass) * 5000 / (((obj2.diameter/2 + obj2.x) * Math.abs(obj2.diameter/2 + obj2.x)) + ((obj2.diameter/2 + obj2.y) * Math.abs(obj2.diameter/2 + obj2.y))));

}

function scrollWheel(evt) {
    if (Math.sign(evt.deltaY) == 1) {
        scaleVector++;
    } else if (Math.sign(evt.deltaY) == -1) {
        scaleVector--;
    }

    if (scaleVector < 1) {
        scaleVector = 1;
    }
    console.log(evt);
}

function mouseDown(evt) {
    if (evt.button == 1) {
        middlePress = true;
    } else {
        mousePress = true;
    }
    mouse.x1 = evt.clientX;
    mouse.y1 = evt.clientY;
}

function mouseUp(evt) {
    if (evt.button == 1) {
        middlePress = false;
    } else {
        mousePress = false;
        planets.push(new Planet(evt.clientX- 25, evt.clientY - 25, 50, 0.1 * (mouse.x1 - mouse.x2), 0.1 * (mouse.y1 - mouse.y2), 20, allImgs[Math.floor(Math.random() * 3)]));
    }
    mouse.x2 = evt.clientX;
    mouse.y2 = evt.clientY;
}

function mouseMove(evt) {
    mouse.x2 = evt.clientX;
    mouse.y2 = evt.clientY;
}