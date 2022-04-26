window.onload=function() {
    canv = document.getElementById("gc");
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
    ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    animate();
}

var earth = new Image();
earth.src = "res/earth.png";

var rocketpic = new Image();
rocketpic.src = "res/rocket-no-flame.png";

let upPress = false;



let rocket = {
    fuel: 100,
    x: 15.0,
    y: 15.0,
    rotation: 0.0,
    rotationSpeed: 0.0,
    width: 29,
    height: 20,
    speedX: 0.0,
    speedY: 0.0,
    level: 0
}

let hole = {
    x: 70,
    y: 70,
    width: 50,
    height: 50
}

let keys = [];

function animate() {
    //Collision with left wall
    if (rocket.x < 0) {
        rocket.x = 0;
        rocket.speedX = -rocket.speedX;
    }

    //Collision with right wall
    if (rocket.x > canv.width - rocket.width) {
        rocket.x = canv.width - rocket.width;
        rocket.speedX = -rocket.speedX;
    }

    //Collision with ceiling
    if (rocket.y < 0) {
        rocket.y = 0;
        rocket.speedY = -rocket.speedY;
    }

    //Collision with floor
    if (rocket.y > canv.height - rocket.height) {
        rocket.y = canv.height - rocket.height;
        rocket.speedY = -rocket.speedY;
    }

    if ((Math.floor(rocket.x) + rocket.width >= hole.x && Math.floor(rocket.x) <= hole.x + hole.width) && (Math.floor(rocket.y) + rocket.height >= hole.y && Math.floor(rocket.y) <= hole.y + hole.height)) {
        newGame();
    }

    if (Math.abs(rocket.rotation) == 2 * Math.PI)
        rocket.rotation = 0.0;

    if (keys[38]) {
        if (rocket.fuel > 0) {
            rocketpic.src = "res/rocket.png";
            rocket.speedX += (Math.cos(rocket.rotation) * 0.05);
    
            rocket.speedY += (Math.sin(rocket.rotation) * 0.05);
    
            rocket.fuel-=0.2;
        }
    } else {
        rocketpic.src = "res/rocket-no-flame.png";
    }
    if (keys[37]) {
        rocket.rotationSpeed -= 0.001;
    }
    if (keys[39]) {
        rocket.rotationSpeed += 0.001;
    }
    
    rocket.x+=rocket.speedX;
    rocket.y+=rocket.speedY;
    
    rocket.rotation+=rocket.rotationSpeed;

    draw();

    requestAnimationFrame(animate);
}


function draw() {
    ctx.font = '50px sans-serif';
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.drawImage(earth, hole.x, hole.y);

    ctx.translate(rocket.width / 2 + rocket.x, rocket.height / 2 + rocket.y);
    ctx.rotate(rocket.rotation);
    ctx.translate(-(rocket.width / 2 + rocket.x), -(rocket.height / 2 + rocket.y));
    ctx.drawImage(rocketpic, Math.floor(rocket.x), Math.floor(rocket.y));
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "crimson";
    ctx.fillRect(canv.width - 40, canv.height - rocket.fuel * 2, 40, rocket.fuel * 2)

    ctx.fillStyle = "white";
    ctx.fillText(rocket.level.toString(), 5, 55);

}

function newGame() {
    rocket.speedX = 0.0;
    rocket.speedY = 0.0;
    
    rocket.x = Math.floor(Math.random() * (canv.width - rocket.width));
    rocket.y = Math.floor(Math.random() * (canv.height - rocket.height));
    
    hole.x = Math.floor(Math.random() * (canv.width - hole.width));
    hole.y = Math.floor(Math.random() * (canv.height - hole.height));

    rocket.fuel += 10;

    rocket.level++;
    console.log(rocket.level)
}
function keyDown(evt) {
    keys[evt.keyCode] = true;
}

function keyUp(evt) {
    keys[evt.keyCode] = false;
}
