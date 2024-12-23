const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');
const saveEl = document.getElementById('save');
const eraserEl = document.getElementById('eraser');
const bgColorEl = document.getElementById('background-color');

const ctx = canvas.getContext('2d');

let size = 10;
let isPressed = false;
let color = colorEl.value;
let backgroundColor = '#ffffff';
let isEraser = false;
let x, y;

// Initialize canvas background 
ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Event Listeners
canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
});

document.addEventListener('mouseup', () => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

increaseBtn.addEventListener('click', () => {
    size = Math.min(size + 5, 50);
    updateSizeOnScreen();
});

decreaseBtn.addEventListener('click', () => {
    size = Math.max(size - 5, 5);
    updateSizeOnScreen();
});

colorEl.addEventListener('change', (e) => {
    color = e.target.value;
    isEraser = false;
});

eraserEl.addEventListener('click', () => {
    isEraser = true;
    color = backgroundColor; // Set eraser to match the background  (When we change it)
});

bgColorEl.addEventListener('change', (e) => {
    backgroundColor = e.target.value;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

clearEl.addEventListener('click', () => {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

saveEl.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'drawing-pad.png';
    link.href = canvas.toDataURL();
    link.click();
});


function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = isEraser ? backgroundColor : color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = isEraser ? backgroundColor : color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

function updateSizeOnScreen() {
    sizeEL.innerText = size;
}
