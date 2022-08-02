//query selectors 
const splashScreen = document.querySelector('#splash-screen');
const gameBoard = document.querySelector('#game-board');
const endScreen = document.querySelector('#end-screen');
const restartButton = document.querySelector('#restart-button');
const scoreText = document.querySelector('#score');
const gameOverRestart = document.querySelector('#game-over-restart');

//gameArea Object
const gameArea = {
    canvas: document.createElement('canvas'), //creating canvas element
    frames: 0,
    score: 0,
    lives: 3,
    start: function(){
        splashScreen.style.display = 'none';
        gameBoard.style.display = 'flex';
        endScreen.style.display = 'none';
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext('2d'); //initializing canvas 
        gameBoard.insertBefore(this.canvas, gameBoard.childNodes[1]); // appending this.canvas to gameBoard
        this.interval = setInterval(updateGame, 20); //update game area every 20ms 
        
    },
    stop: function(){ //stops the game 
        clearInterval(this.interval);
        gameBoard.style.display = 'none';
        endScreen.style.display = 'flex';
        scoreText.innerText = `Score: ${this.score}`;
    },
    clear: function(){ //Clears the game area and draws the background 
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.score < 20) {
            this.context.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.context.drawImage(hellBackground, 0, 0, this.canvas.width, this.canvas.height);
        }
    },
    restart: function(){
        this.frames = 0;
        this.score = 0;
        this.lives = 3;
    }
}

//update function
function updateGame(){
    gameArea.clear();
    animateClouds();
    player1.updatePos();    
    ghosts();
    keepScore();
    lives();
}

//lives function 
function lives(){
    const ctx = gameArea.context;
    if (gameArea.lives === 3){
        ctx.drawImage(hearts3, 858, -30, 150, 150);
    } else if (gameArea.lives === 2){
        ctx.drawImage(hearts2, 860, -30, 85, 150);
    } else if (gameArea.lives === 1){
        ctx.drawImage(hearts1, 860, -30, 60, 150);
    } else {
        gameArea.stop();
    }
}

//keep score function
function keepScore(){
    const ctx = gameArea.context;
    ctx.font = '18px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${gameArea.score}`, 900, 20);
}

//animate clouds function 
let cloud1X = 1000;
let cloud1Y = -60;
let cloud2X = 1500; 
let cloud2Y = 40;
function animateClouds(){
    const ctx = gameArea.context;
    if (gameArea.score < 20){
        ctx.drawImage(cloud, cloud1X, cloud1Y, 300, 250);
        ctx.drawImage(cloud, cloud2X, cloud2Y, 200, 150);
        cloud1X >= -300 ? cloud1X-- : cloud1X = 1000; 
        cloud2X >= -200 ? cloud2X-- : cloud2X = 1000;        
    }
}

//ghosts function
let ghostX = Math.floor(Math.random() * 1000); //random x coordinate 
let ghost2X = Math.floor(Math.random() * 1000);
let ghostY = -100; //y coordinate outside of canvas 
const ghostsArr = []; //empty array for ghosts
function ghosts(){
    const ctx = gameArea.context;
    gameArea.frames++; 
    if (gameArea.score < 10){ //this conditional makes the game harder after score = 10
        if (gameArea.frames % 75 === 0){ 
            ghostsArr.push(new gameElement(ghostImg, ghostX, ghostY, 100, 100)); //push a new ghost into ghost array
        }
        if (gameArea.frames % 250 === 0) { 
            ghostsArr.push(new gameElement(ghostImg2, ghost2X, ghostY, 120, 120)); //push second ghost into ghost array 
        }
    } else if (gameArea.score < 20){ //this conditional makes the game harder after score = 20
        if (gameArea.frames % 60 === 0){ 
            ghostsArr.push(new gameElement(ghostImg, ghostX, ghostY, 100, 100)); 
        }
        if (gameArea.frames % 200 === 0) { 
            ghostsArr.push(new gameElement(ghostImg2, ghost2X, ghostY, 120, 120)); 
        }        
    } else {
        if (gameArea.frames % 50 === 0){ 
            ghostsArr.push(new gameElement(hellGhost1, ghostX, ghostY, 100, 100)); 
        }
        if (gameArea.frames % 150 === 0) { 
            ghostsArr.push(new gameElement(hellGhost1, ghost2X, ghostY, 120, 120)); 
        }        
    }
    for (let i = 0; i < ghostsArr.length; i++){ 
        ghostsArr[i].y += 4; //update position of ghost 
        ghostsArr[i].updatePos();
        ghostX = Math.floor(Math.random() * 1000);
        document.addEventListener('keypress', (e) => { //deleting ghostsArr[i] with spacebar 
            if (player1.checkIfNear(ghostsArr[i]) && e.keyCode === 32){ //if player is near the ghost and spacebar is pressed
                ghostsArr.splice([i], 1);
                gameArea.score++;
            }
        });
        if (ghostsArr[i].y > 500){ //if ghost touches leaves frame -> delete from array and -1 from lives 
            ghostsArr.splice([i], 1);
            gameArea.lives--;
        }
    }
}

//game element class 
class gameElement {
    constructor (img, x, y, w, h){
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    updatePos(){
        gameArea.context.drawImage(this.img, this.x, this.y, this.w, this.h); //updating position method 
    }
    //Methods to return current position of game element 
    left(){
        return this.x;
    }
    right(){
        return this.x + this.w;
    }
    top(){
        return this.y;
    }
    bottom(){
        return this.y + this.h;
    }
    checkIfNear(element){ //logic to check if player is near an element (ghost)
        return (this.top() <= element.bottom() && this.bottom() >= element.top() && this.left() <= element.right() && this.right() >= element.left());
    }
}

const player1 = new gameElement(playerImg, 440, 350, 150, 150); //Creating Player1 