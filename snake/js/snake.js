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

setInterval(main, 100);

function main() {
    update(); // actualizar las variables del juego
    draw(); // encargar de dibujar todos los objetos del juego
}

function update() {

    checkSnakeCollision();

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

    if (food && head.x === food.x && head.y === food.y) {
        food = null;
        increaseSnakeSize(prevX, prevY);
    }

    if (!food) {
        food = {
            x: getRandomX(), y: getRandomY()
        };
    }

}

function checkSnakeCollision() {
    for (let i = 0; i < body.length; ++i) { //Las coordenadas de la cabeza sean igual a las coordenadas del cuerpo de la serpiente
        if (head.x == body[i].x && head.y == body[i].y) {
            alert('Has perdido');
        }
    }

    const topCollision = (head.y < 0);
    const botomCollision = (head.y > 480);
    const leftColision = (head.x < 0);
    const rightCollision = (head.x > 480);
    if (topCollision || botomCollision || leftColision || rightCollision) {
        alert('Has perdido');
        head.x = 0;
        head.y = 0;
        dy = 0; dx = 0;
        body = [];
    }
}

function increaseSnakeSize(prevX, prevY) {
    body.push({
        x: prevX, y: prevY
    });
}

function gameOver() {

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
            if (dy === 0) {
                dx = 0;
                dy = -SIZE;
            }
            break;
        case 'ArrowDown':
            console.log('Mover hacía abajo');
            if (dy === 0) {
                dx = 0;
                dy = SIZE;
            }
            break;
        case 'ArrowRight':
            console.log('Mover a la derecha');
            if (dx === 0) {
                dx = SIZE;
                dy = 0;
            }
            break;
        case 'ArrowLeft':
            console.log('Mover a la izquierda');
            if (dx === 0) {
                dx = -SIZE;
                dy = 0;
            }
            break;
    }
}