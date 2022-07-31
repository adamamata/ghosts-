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
const background = new Image();
background.src ='/assets/images/background.jpg';

//gameArea Object
const gameArea = {
    canvas: document.createElement('canvas'),
    frame: 0,
    start: function(){
        splashScreen.style.display = 'none';
        gameBoard.style.display = 'flex';
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext('2d'); 
        gameBoard.insertBefore(this.canvas, gameBoard.childNodes[1]); // appending this.canvas to gameBoard
        this.interval = setInterval(update, 20); //update game area every 20ms 
        this.context.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function(){
        clearInterval(this.interval);
    }
}

//update function
function update(){
    
}