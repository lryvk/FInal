const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleHeight = 100;
const paddleWidth = 10;
const ballSize = 10;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    function drawScore() {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Player 1: " + player1Score, 50, 50);
        ctx.fillText("Player 2: " + player2Score, canvas.width - 200, 50);
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRect(0, player1Y, paddleWidth, paddleHeight, "green");
    drawRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight, "red");

    
    drawCircle(ballX, ballY, ballSize, "white");

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top/bottom walls
    if (ballY < 0 || ballY > canvas.height - ballSize) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX <= paddleWidth && ballY >= player1Y && ballY <= player1Y + paddleHeight ||
        ballX >= canvas.width - paddleWidth - ballSize && ballY >= player2Y && ballY <= player2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds
    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }
}

function mouseMove(event) {
    let rect = canvas.getBoundingClientRect();
    let mouseY = event.clientY - rect.top - paddleHeight / 2;
    player1Y = mouseY;
}

canvas.addEventListener("mousemove", mouseMove);

setInterval(draw, 16.67); 