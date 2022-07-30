//Window onload 
window.onload = () => {   
    startButton.onclick = () => {
        gameArea.start();
    }
}

//splash-screen button audio
const startButton = document.getElementById('start-button');
const soundArr = document.getElementsByTagName('audio');
startButton.addEventListener('mouseenter', () => {
    soundArr[0].play();
});


//query selectors 
const splashScreen = document.querySelector('#splash-screen');
const gameBoard = document.querySelector('#game-board');

//gameArea Object
const gameArea = {
    canvas: document.createElement('canvas'),
    frame: 0,
    start: function(){
        splashScreen.style.display = 'none';
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext('2d'); 
        gameBoard.appendChild(this.canvas); // appending this.canvas to gameBoard
        this.interval = setInterval(update, 20); //update game area every 20ms 
    },
    stop: function(){
        clearInterval(this.interval);
    }
}