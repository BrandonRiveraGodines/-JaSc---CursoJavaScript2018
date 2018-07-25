const myCanvas = document.getElementById('myCanvas');
const context = myCanvas.getContext('2d');
const SIZE = 20;
const head = {
    x: 0,
    y: 0
};
const body = [];
let food = null;
let dy = 0;
let dx = 0;
let lastAxis;

setInterval(main, 100);

function main() {
    update(); // actualizar las variables del juego
    draw(); // encargar de dibujar todos los objetos del juego
}

function update() {
    const colisionDetected = checkSnakeCollision();
    if (colisionDetected) {
        gameOver();
        return;
    }
    let prevX, prevY;
    if (body.length >= 1) {
        prevX = body[body.length - 1].x;
        prevY = body[body.length - 1].y;
    } else {
        prevX = head.x;
        prevY = head.y;
    }
    for (let i = body.length - 1; i >= 1; --i) {
        body[i].x = body[i - 1].x;
        body[i].y = body[i - 1].y; // El elemento 3 <- elemento 2
    }
    if (body.length >= 1) {
        body[0].x = head.x;
        body[0].y = head.y;
    }
    head.x += dx;
    head.y += dy;
    if(dx !== 0){
        lastAxis = 'X';
    } else if (dy !== 0){
        lastAxis = 'Y';
    }
    if (food && head.x === food.x && head.y === food.y) {
        food = null;
        increaseSnakeSize(prevX, prevY);
    }
    if (!food) {
        food = randomFoodPosition();
    }
}

function randomFoodPosition() {
    let position;
    do {
        position = { x: getRandomX(), y: getRandomY() };
    } while (checkFoodCollision(position));
    return position
}

function checkFoodCollision(position) {
    for (let i = 0; i < body.length; ++i) { //Las coordenadas de la cabeza sean igual a las coordenadas del cuerpo de la serpiente
        if (position.x == body[i].x && position.y == body[i].y) {
            return true;
        }
    }
    if (position.x == head.x && position.y == head.y) {
        return true;
    }
    return false;
}

function checkSnakeCollision() {
    for (let i = 0; i < body.length; ++i) { //Las coordenadas de la cabeza sean igual a las coordenadas del cuerpo de la serpiente
        if (head.x == body[i].x && head.y == body[i].y) {
            return true;
        }
    }
    const topCollision = (head.y < 0);
    const botomCollision = (head.y > 480);
    const leftColision = (head.x < 0);
    const rightCollision = (head.x > 480);
    if (topCollision || botomCollision || leftColision || rightCollision) {
        return true;
    }
    return false;
}

function increaseSnakeSize(prevX, prevY) {
    body.push({
        x: prevX, y: prevY
    });
}

function gameOver() {
    alert('Has perdido');
    head.x = 0;
    head.y = 0;
    dy = 0; dx = 0;
    body.length = 0;
}

function getRandomX() {
    return 20 * parseInt(Math.random() * 25);
}

function getRandomY() {
    return 20 * parseInt(Math.random() * 25);
}

function draw() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, myCanvas.width, myCanvas.height);
    drawObject(head, 'orange');
    body.forEach(
        elem => drawObject(elem, 'lime')
    );
    drawObject(food, 'white');
}


function drawObject(obj, color) {
    context.fillStyle = color;
    context.fillRect(obj.x, obj.y, SIZE, SIZE);
}

document.addEventListener('keydown', moveSnake);

function moveSnake(event) {
    switch (event.key) {
        case 'ArrowUp':
            console.log('Mover hacía arriba');
            if (lastAxis !== 'Y') {
                dx = 0;
                dy = -SIZE;
            }
            break;
        case 'ArrowDown':
            console.log('Mover hacía abajo');
            if (lastAxis !== 'Y') {
                dx = 0;
                dy = SIZE;
            }
            break;
        case 'ArrowRight':
            console.log('Mover a la derecha');
            if (lastAxis !== 'X') {
                dx = SIZE;
                dy = 0;
            }
            break;
        case 'ArrowLeft':
            console.log('Mover a la izquierda');
            if (lastAxis !== 'X') {
                dx = -SIZE;
                dy = 0;
            }
            break;
    }
}