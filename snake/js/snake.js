const myCanvas = document.getElementById('myCanvas');
const context = myCanvas.getContext('2d');
const SIZE = 20;
const head = {
    x: 0,
    y: 0
};
let food = null;
let dy = 0;
let dx = 0;

setInterval(main, 1000);

function main() {
    update(); // actualizar las variables del juego
    draw(); // encargar de dibujar todos los objetos del juego
}

function update() {
    head.x += dx;
    head.y += dy;

    if (food && head.x === food.x && head.y === food.y) {
        food = null;
    }

    if (!food) {
        food = {
            x: getRandomX(), y: getRandomY()
        };
    }
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
    drawObject(head, 'lime');
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
            dx = 0;
            dy = -SIZE;
            break;
        case 'ArrowDown':
            console.log('Mover hacía abajo');
            dx = 0;
            dy = SIZE;
            break;
        case 'ArrowRight':
            console.log('Mover a la derecha');
            dx = SIZE;
            dy = 0;
            break;
        case 'ArrowLeft':
            console.log('Mover a la izquierda');
            dx = -SIZE;
            dy = 0;
            break;
    }
}