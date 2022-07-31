//Window onload 
window.onload = () => {   
    startButton.onclick = () => {
        gameArea.start();
    }
}

//query selectors 
const splashScreen = document.querySelector('#splash-screen');
const gameBoard = document.querySelector('#game-board');

//Images 
const background = new Image(); //Background image
background.src ='./assets/images/background.jpg';
const cloud = new Image(); //cloud image
cloud.src = './assets/images/cloud.png';
const playerImg = new Image(); //player image
playerImg.src = './assets/images/player.png';
const playerRight = new Image(); //player right image
playerRight.src = './assets/images/Running/run-right.png';
const playerLeft = new Image(); //player left image
playerLeft.src = './assets/images/Running/run-left.png';
const playerAttack = new Image(); //player attack image 1
playerAttack.src = './assets/images/attack.png';
const playerAttack2 = new Image(); //player attack image 2
playerAttack2.src = './assets/images/attack2.png';
const ghostImg = new Image(); //ghost image 
ghostImg.src = './assets/images/ghost.png'
const ghostImg2 = new Image();
ghostImg2.src = './assets/images/ghost1.png';

//gameArea Object
const gameArea = {
    canvas: document.createElement('canvas'), //creating canvas element
    frames: 0,
    start: function(){
        splashScreen.style.display = 'none';
        gameBoard.style.display = 'flex';
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext('2d'); //initializing canvas 
        gameBoard.insertBefore(this.canvas, gameBoard.childNodes[1]); // appending this.canvas to gameBoard
        this.interval = setInterval(updateGame, 20); //update game area every 20ms 
        
    },
    stop: function(){ //stops the game 
        clearInterval(this.interval);
    },
    clear: function(){ //Clears the game area and draws the background 
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);
    },
}

//update function
function updateGame(){
    gameArea.clear();
    animateClouds();
    player1.updatePos();
    ghosts();
}

//animate clouds function 
let cloud1X = 1000;
let cloud1Y = -60;
let cloud2X = 1500; 
let cloud2Y = 40;
function animateClouds(){
    const ctx = gameArea.context;
    ctx.drawImage(cloud, cloud1X, cloud1Y, 300, 250);
    ctx.drawImage(cloud, cloud2X, cloud2Y, 200, 150);
    cloud1X >= -300 ? cloud1X-- : cloud1X = 1000; 
    cloud2X >= -200 ? cloud2X-- : cloud2X = 1000;
}

//ghosts function
let ghostX = Math.floor(Math.random() * 1000); //random x coordinate 
let ghost2X = Math.floor(Math.random() * 1000);
let ghostY = -100; //y coordinate outside of canvas 
const ghostsArr = []; //empty array for ghosts
function ghosts(){
    const ctx = gameArea.context;
    gameArea.frames++; 
    if (gameArea.frames % 100 === 0){ //every 100 frames
        ghostsArr.push(new gameElement(ghostImg, ghostX, ghostY, 100, 100)); //push a new ghost into ghost array
    }
    if (gameArea.frames % 250 === 0) { //every 250 frames 
        ghostsArr.push(new gameElement(ghostImg2, ghost2X, ghostY, 120, 120)); //push second ghost into ghost array 
    }
    for (let i = 0; i < ghostsArr.length; i++){ 
        ghostsArr[i].y += 2; //update position of ghost 
        ghostsArr[i].updatePos();
        ghostX = Math.floor(Math.random() * 1000);
    }
}

//Class for player 
class gameElement {
    constructor (img, x, y, w, h){
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.alive = true;
    }
    updatePos(){
        gameArea.context.drawImage(this.img, this.x, this.y, this.w, this.h); //updating position method 
    }
}

const player1 = new gameElement(playerImg, 440, 350, 150, 150); //Creating Player1 

document.addEventListener('keydown', (e) => { //Event listener to control player
    switch (e.keyCode){
        case 39: //right arrow
            if (player1.x < 900){
                player1.x += 20;
                player1.img = playerRight;
            }
            break;
        case 37: //left arrow
            if (player1.x > -40){
                player1.x -= 20;
                player1.img = playerLeft;
            }
            break;
        case 32:  //spacebar 
            soundArr[1].play();
            player1.img = playerAttack;
            setTimeout(function(){
                player1.img = playerAttack2;
            }, 50)
            break;
    }
});

document.addEventListener('keyup', (e) => { //reseting player1.img after keyup 
    switch (e.keyCode){
        case 39: //right arrow 
            player1.img = playerImg;
            break;
        case 37: //left arrow
            player1.img = playerImg;
            break;
        case 32: //spacebar
            player1.img = playerImg;
            break;
    }
});