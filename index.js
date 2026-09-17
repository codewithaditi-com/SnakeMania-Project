// Game constants and variable

let inputDir = { x: 1, y: 0 };
const board = document.getElementById('board');
const scoreElement = document.getElementById('scoreElement');
const highscoreElement = document.getElementById('highscoreElement');
const foodSound = new Audio('food.mp3');
foodSound.preload = 'auto';
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
musicSound.loop = true;
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]

let food = { x: 6, y: 7 };

// Game functions

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    } lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // If you bump into the wall
    if (snake[0].x > 18 || snake[0].x < 1 || snake[0].y > 18 || snake[0].y < 1) {
        return true;
    }

    return false;
}

function gameEngine() {
    // Part 1: Updating the snake array and food 
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over, press an arrow key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
        scoreElement.innerHTML = "Score: " + score;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.currentTime = 0;
        foodSound.play().catch(error => console.error('Food sound could not play:', error));
        score += 1;
        if (score > highscoreval) {
            highscoreval = score;
            localStorage.setItem("highScore", JSON.stringify(highscoreval));
            highscoreElement.innerHTML = "High Score: " + highscoreval;
        }
        scoreElement.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part 2 : Display the snake and food

    // Display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display the snake 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}





// Main logic starts here 
let highScore = localStorage.getItem("highScore") || 0;
if (highScore === null) {
    highscoreval = 0;
    localStorage.setItem("highScore" , JSON.stringify(highscoreval));
}else {
    highscoreval = JSON.parse(highScore);
    highscoreElement.innerHTML = "High Score: " + highScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    if (e.key.startsWith('Arrow')) {
        musicSound.play().catch(() => {});
    }

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            if (inputDir.y !== 1) {
                inputDir.x = 0;
                inputDir.y = -1;
            }
            moveSound.play();
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            if (inputDir.y !== -1) {
                inputDir.x = 0;
                inputDir.y = 1;
            }
            moveSound.play();
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            if (inputDir.x !== -1) {
                inputDir.x = 1;
                inputDir.y = 0;
            }
            moveSound.play();
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            if (inputDir.x !== 1) {
                inputDir.x = -1;
                inputDir.y = 0;
            }
            moveSound.play();
            break;

        default:
            break;
    }
});